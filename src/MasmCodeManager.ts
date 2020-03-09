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

    runInBox() {
        const filename = code.window.activeTextEditor?.document.fileName;
        const currentPath = filename?.substring(0, filename?.lastIndexOf('\\'));
        const autoExec = `mount c ${currentPath}
c:\\`;
        this._config.writeConfig(autoExec);
        const DosBoxPath = this._config.path;
        if (DosBoxPath !== null) {
            if (this._terminal === null) {
                this._terminal = code.window.createTerminal({
                    shellPath: 'powershell.exe',
                    hideFromUser: true
                });
            }
            this._terminal.sendText('cd ' + DosBoxPath);
            this._terminal.sendText('.\\dosbox.exe -conf .\\dosbox.conf');
            // ps.dispose();
        } else {
            code.window.showErrorMessage('未设置DOSBox路径。');
        }
    }



}