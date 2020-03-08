import { ExtensionContext, commands } from 'vscode';
import { MasmCodeManager } from './MasmCodeManager';

export function activate(context: ExtensionContext) {

	const masmManager = new MasmCodeManager();
	masmManager.activate();

	let runInBox = commands.registerCommand('extension.runInBox', (param) => {
		masmManager.runInBox();
	});
	context.subscriptions.push(runInBox);
}

export function deactivate() { }
