import * as request from 'request';
import { checkMissingFile } from './DOSBoxFileCheck';
import { createWriteStream } from 'fs';
import { FileSystem, OutputChannel } from 'vscode';
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
    private path: string;
    private MASMPath: string;
    private channel: OutputChannel;

    constructor(fs: FileSystem, path: string, outputChannel: OutputChannel) {
        this.fs = fs;
        this.path = path;
        this.MASMPath = path + '/bin';
        this.channel = outputChannel;
    }

    public downloadMissingFile() {
        this.channel.appendLine('正在下载DOSBox和Masm缺失的文件。');
        checkMissingFile(this.fs, this.path, Downloader.DOSBOX).then(fileList => {
            fileList.forEach(file => {
                this.channel.appendLine(`文件：${file}缺失，正在重新下载。`);
                this.download(this.path, file,
                    'https://raw.githubusercontent.com/Woodykaixa/masm-code/master/dosbox');
            });
        });
        checkMissingFile(this.fs, this.path, Downloader.MASM).then(fileList => {
            fileList.forEach(file => {
                this.channel.appendLine(`文件:${file}缺失，正在重新下载。`);
                this.download(this.path, file,
                    'https://raw.githubusercontent.com/Woodykaixa/masm-code/master/dosbox/bin');
            });
        });
        this.channel.appendLine('下载完成。');
    }
    private download(path: string, filename: string, uri: string) {
        const stream = createWriteStream(path + '/' + filename);
        request(uri + '/' + filename).pipe(stream).on('close', () => { this.channel.appendLine(filename + ' 下载完成'); });
    };

}

