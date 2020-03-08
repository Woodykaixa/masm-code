import * as request from 'request';
import { checkMissingFile } from './DOSBoxFileCheck';
import { createWriteStream } from 'fs';
import { FileSystem, OutputChannel, window } from 'vscode';
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

    private fs: FileSystem;
    private path: string | undefined | null;
    private channel: OutputChannel;

    constructor(fs: FileSystem, path: string | undefined | null, outputChannel: OutputChannel) {
        this.fs = fs;
        this.path = path;
        this.channel = outputChannel;
    }

    public downloadMissingFile() {
        if (typeof this.path !== 'string') {
            window.showErrorMessage('未设置DOSBox路径。');
            return;
        }
        const path = this.path as string;
        this.channel.appendLine('正在下载DOSBox和Masm缺失的文件。');
        checkMissingFile(this.fs, this.path, Downloader.DOSBOX).then(fileList => {
            fileList.forEach(file => {
                this.channel.appendLine(`文件：${file}缺失，正在重新下载。`);
                this.download(path, file,
                    'https://raw.githubusercontent.com/Woodykaixa/masm-code/master/dosbox');
            });
        });
        checkMissingFile(this.fs, this.path, Downloader.MASM).then(fileList => {
            fileList.forEach(file => {
                this.channel.appendLine(`文件:${file}缺失，正在重新下载。`);
                this.download(path, file,
                    'https://raw.githubusercontent.com/Woodykaixa/masm-code/master/dosbox/bin');
            });
        });
        this.channel.appendLine('下载完成。');
    }
    private download(path: string, filename: string, uri: string) {
        const stream = createWriteStream(path + '/' + filename);
        request(uri + '/' + filename).pipe(stream)
            .on('close', () => { this.channel.appendLine(filename + ' 下载完成'); });
    };

}

