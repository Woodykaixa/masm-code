import * as request from 'request';
import { createWriteStream } from 'fs';
import { FileSystem, OutputChannel, Uri } from 'vscode';
export class Downloader {

    public static readonly DOSBOX = [
        'DOSBox.exe',
        'SDL_net.dll',
        'SDL.dll'
    ];

    private static readonly MASM = [
        'DEBUG.EXE',
        'DOSXNT.EXE',
        'LINK.EXE',
        'MASM.EXE',
        'ML.EXE'
    ];

    private _fs: FileSystem;
    private _path: string;
    private _channel: OutputChannel;
    private _directoryUri: Uri;

    constructor(fs: FileSystem, path: string, outputChannel: OutputChannel) {
        this._fs = fs;
        this._path = path;
        this._channel = outputChannel;
        this._directoryUri = Uri.parse('file:///' + this._path);

    }

    async checkMissingFile(fileList: string[]) {
        const entries = await this._fs.readDirectory(this._directoryUri);
        const toDownload = fileList.concat();
        entries.forEach(entry => {
            const i = toDownload.indexOf(entry[0]);
            if (i !== -1) {
                toDownload.splice(i, 1);
            }
        });
        return toDownload;
    };

    public async downloadMissingFile() {
        console.log(this._path);
        console.log(this._directoryUri);
        this._channel.appendLine('正在下载DOSBox和Masm缺失的文件。');
        await this._fs.createDirectory(this._directoryUri);
        let fileList = await this.checkMissingFile(Downloader.DOSBOX);
        fileList.forEach(file => {
            this._channel.appendLine(`文件：${file}缺失，正在重新下载。`);
            this.download(this._path, file,
                'https://raw.githubusercontent.com/Woodykaixa/masm-code/master/dosbox');
        });
        fileList = await this.checkMissingFile(Downloader.MASM);
        fileList.forEach(file => {
            this._channel.appendLine(`文件:${file}缺失，正在重新下载。`);
            this.download(this._path, file,
                'https://raw.githubusercontent.com/Woodykaixa/masm-code/master/dosbox/bin');
        });
    }
    private download(path: string, filename: string, uri: string) {
        const stream = createWriteStream(path + '/' + filename);
        request(uri + '/' + filename).pipe(stream)
            .on('close', () => { this._channel.appendLine(filename + ' 下载完成'); });
    };

}

