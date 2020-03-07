import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "masm-code" is now active!');
	const DosBoxPath = vscode.workspace.getConfiguration('masm-code.DOSBox').get('path') as string;
	console.log(context.globalStoragePath);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let runInBox = vscode.commands.registerCommand('extension.runInBox', (param) => {
		console.log(DosBoxPath);
		if (DosBoxPath !== null) {
			vscode.window.createTerminal('DOSBox', DosBoxPath);
		} else {
			vscode.window.showErrorMessage('未设置DOSBox路径。');
		}
	});
	context.subscriptions.push(runInBox);
}

export function deactivate() { }
