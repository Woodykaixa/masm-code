import * as vscode from 'vscode';
import { Config } from './DOSBoxConfig';
import { Downloader } from './DOSBoxDownloader';

export function activate(context: vscode.ExtensionContext) {

	const masmChannel = vscode.window.createOutputChannel('Masm-code组件检查');
	const DosBoxPath = vscode.workspace.getConfiguration('masm-code.DOSBox').get('path') as string;
	const DosBoxHeight = vscode.workspace.getConfiguration('masm-code.DOSBox').get('height') as number;
	const DosBoxWidth = vscode.workspace.getConfiguration('masm-code.DOSBox').get('width') as number;
	const fs = vscode.workspace.fs;
	new Downloader(fs, DosBoxPath, masmChannel).downloadMissingFile();
	vscode.workspace.workspaceFolders?.forEach(f => {
		console.log(f);
	});
	masmChannel.appendLine('开始读取DOSBox设置。');
	new Config(DosBoxWidth, DosBoxHeight).writeConfig(fs, vscode.Uri.parse('file:///' + DosBoxPath + '/dosbox.conf'));
	masmChannel.appendLine('读取完成。');
	let runInBox = vscode.commands.registerCommand('extension.runInBox', (param) => {
		if (DosBoxPath !== null) {
			let ps = vscode.window.createTerminal({
				shellPath: 'powershell.exe',
			});
			ps.sendText('cd ' + DosBoxPath);
			ps.sendText('.\\dosbox.exe -conf .\\dosbox.conf');
			// ps.dispose();
			
		} else {
			vscode.window.showErrorMessage('未设置DOSBox路径。');
		}
	});
	context.subscriptions.push(runInBox);
}

export function deactivate() { }
