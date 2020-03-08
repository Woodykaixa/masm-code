import * as code from 'vscode';
import { Downloader } from './DOSBoxDownloader';
import { Config } from './DOSBoxConfig';

export class MasmCodeManager {

    private readonly _masmChannel: code.OutputChannel;
    private readonly _fs: code.FileSystem;
    private readonly _config: Config;
    private readonly _downloader: Downloader;
    constructor() {
        this._masmChannel = code.window.createOutputChannel('Masm-Code');
        this._fs = code.workspace.fs;
        this._config = new Config(this._fs, 'masm-code.DOSBox');
        this._downloader = new Downloader(this._fs, this._config.path, this._masmChannel);
    }

    activate() {
        this._downloader.downloadMissingFile();
        this._config.writeConfig();
    }

    runInBox() {
        const DosBoxPath = this._config.path;        
		if (DosBoxPath !== null) {
			let ps = code.window.createTerminal({
				shellPath: 'powershell.exe',
			});
			ps.sendText('cd ' + DosBoxPath);
			ps.sendText('.\\dosbox.exe -conf .\\dosbox.conf');
			// ps.dispose();
            
		} else {
			code.window.showErrorMessage('未设置DOSBox路径。');
		}
    }
    


}