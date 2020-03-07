import * as vscode from 'vscode';
import * as fs from 'fs';
import { execFile } from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "masm-code" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let runInBox = vscode.commands.registerCommand('extension.runInBox', (param) => {
		vscode.languages.getLanguages().then(s => console.log(s));
		vscode.window.createTerminal('DOSBox', 'C:/Users/RTkaixa/Desktop/masm-code/dosbox/DOSBox.exe');
	});

	context.subscriptions.push(runInBox);
}

// this method is called when your extension is deactivated
export function deactivate() { }
