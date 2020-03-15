import { ExtensionContext, commands, workspace, Uri } from 'vscode';
import { MasmCodeManager } from './MasmCodeManager';

export function activate(context: ExtensionContext) {
	const masmManager = new MasmCodeManager(context);
	masmManager.activate();

	let runInBox = commands.registerCommand('extension.runDOSBox', (param) => {
		masmManager.runDOSBox();
	});

	let compileInDOSBox = commands.registerCommand('extension.compileInDOSBox', () => {
		masmManager.compileInDOSBox();
	});
	context.subscriptions.push(runInBox);
	context.subscriptions.push(compileInDOSBox);
}

export function deactivate() { }
