import { ExtensionContext, commands } from 'vscode';
import { MasmCodeManager } from './MasmCodeManager';


let masmManager: MasmCodeManager;
export function activate(context: ExtensionContext) {
	masmManager = new MasmCodeManager(context);
	masmManager.activate();

	let runInBox = commands.registerCommand('extension.runDOSBox', (param) => {
		masmManager.runDOSBox();
	});

	let compileInDOSBox = commands.registerCommand('extension.compileInDOSBox', () => {
		masmManager.compileInDOSBox();
	});

	let compileInDOSBoxTwoSteps = commands.registerCommand('extension.compileInDOSBoxTwoSteps', () => {
		masmManager.compileInDOSBoxTwoSteps();
	});

	context.subscriptions.push(runInBox);
	context.subscriptions.push(compileInDOSBox);
	context.subscriptions.push(compileInDOSBoxTwoSteps);
}

export function deactivate() {
	if (masmManager) {
		masmManager.deactivate();
	}
}
