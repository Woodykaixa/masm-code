import * as code from 'vscode';
import { Downloader } from './DOSBoxDownloader';
import { Config } from './DOSBoxConfig';

export class MasmCodeManager {

    private readonly _masmChannel: code.OutputChannel;
    private readonly _fs: code.FileSystem;
    private readonly _config: Config;
    private readonly _downloader: Downloader;
    private _terminal: code.Terminal | null;
    constructor(content: code.ExtensionContext) {
        this._masmChannel = code.window.createOutputChannel('Masm-Code');
        this._fs = code.workspace.fs;
        const path = content.globalStoragePath.replace(/\\/g, '/');;
        this._config = new Config(this._fs, 'masm-code.DOSBox', path);
        this._downloader = new Downloader(this._fs, path, this._masmChannel);
        this._terminal = null;
    }

    activate() {
        this._downloader.downloadMissingFile();
    }

    openDOSBox(autoExec: string) {
        this._config.writeConfig(autoExec);
        const DosBoxPath = this._config.path;
        if (this._terminal === null) {
            this._terminal = code.window.createTerminal({
                shellPath: 'powershell.exe',
                hideFromUser: true
            });
        }
        this._terminal.sendText('cd ' + DosBoxPath);
        this._terminal.sendText('.\\dosbox.exe -conf .\\dosbox.conf');

    }

    runDOSBox() {
        const filename = code.window.activeTextEditor?.document.fileName;
        if (filename === undefined) {
            code.window.showErrorMessage('请先打开.asm文件，然后执行命令');
            return;
        }
        const currentPath = filename?.substring(0, filename.lastIndexOf('\\'));
        const autoExec = `mount c ${currentPath}
c:\\`;
        this.openDOSBox(autoExec);
    }

    //使用ML.EXE编译链接
    compileInDOSBox() {
        const filename = code.window.activeTextEditor?.document.fileName;
        if (filename === undefined) {
            code.window.showErrorMessage('请先打开.asm文件，然后执行命令');
            return;
        }
        const lastIndex = filename.lastIndexOf('\\');
        const currentPath = filename.substring(0, lastIndex);
        const file = filename.substring(lastIndex + 1);
        const fileNoExt = file.substring(0, file.lastIndexOf('.'));
        const autoExec = `mount c ${currentPath}
c:\\
ML ${file}
${fileNoExt}.EXE`;
        this.openDOSBox(autoExec);
    }

    //使用MASM.EXE和LINK.EXE分步编译链接
    compileInDOSBoxTwoSteps() {
        const filename = code.window.activeTextEditor?.document.fileName;
        if (filename === undefined) {
            code.window.showErrorMessage('请先打开.asm文件，然后执行命令');
            return;
        }
        const lastIndex = filename.lastIndexOf('\\');
        const currentPath = filename.substring(0, lastIndex);
        const file = filename.substring(lastIndex + 1);
        const fileNoExt = file.substring(0, file.lastIndexOf('.'));
        const autoExec = `mount c ${currentPath}
c:\\
MASM ${fileNoExt}.ASM ${fileNoExt}.OBJ;
LINK ${fileNoExt}.OBJ; 
${fileNoExt}.EXE`;
        this.openDOSBox(autoExec);
    }
}