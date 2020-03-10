import * as request from 'request';
import { createWriteStream } from 'fs';
import { FileSystem, OutputChannel, Uri } from 'vscode';
export class Downloader {

    private static readonly _FILE_LINK = 'https://github.com/Woodykaixa/masm-code/releases/download/Masm%26DOSBox/';

    public static readonly _FILE_LIST = [
        'DOSBox.exe',
        'SDL_net.dll',
        'SDL.dll',
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
    private _downloadCounter: number = 0;
    private _listCount: number = 0;

    constructor(fs: FileSystem, path: string, outputChannel: OutputChannel) {
        this._fs = fs;
        this._path = path;
        this._channel = outputChannel;
        this._directoryUri = Uri.parse('file:///' + this._path);
    }

    async checkMissingFile(fileList: string[]) {
        this._channel.appendLine('正在检查DOSBox和Masm缺失的文件。');
        const entries = await this._fs.readDirectory(this._directoryUri);
        const toDownload = fileList.concat();
        entries.forEach(entry => {
            const i = toDownload.indexOf(entry[0]);
            if (i !== -1) {
                toDownload.splice(i, 1);
            }
        });
        this._channel.appendLine('检查完成。');
        return toDownload;
    };

    public async downloadMissingFile() {
        await this._fs.createDirectory(this._directoryUri);
        let fileList = await this.checkMissingFile(Downloader._FILE_LIST);
        this._downloadCounter = 0;
        this._listCount = fileList.length;
        if (this._listCount === 0) {
            return;
        }
        fileList.forEach(file => {
            this._channel.appendLine(`文件：${file}缺失，正在重新下载。`);
            this.download(this._path, file);
        });
    }

    private download(path: string, filename: string) {
        const stream = createWriteStream(path + '/' + filename);
        request(Downloader._FILE_LINK + filename).pipe(stream)
            .on('close', () => {
                this._downloadCounter++;
                this._channel.appendLine(`${filename}下载完成。(${this._downloadCounter}/${this._listCount})`);
            });
    };

}

