// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "file-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('file-helper.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from file-helper!');
	});

	context.subscriptions.push(disposable);

    let showFileStatCmd = vscode.commands.registerCommand('showFileStatCmd', (uri: vscode.Uri) => {
		console.log('--- showFileStatCmd ---');
		console.log(uri.fsPath);
		const fileStat = vscode.workspace.fs.stat(uri);
		fileStat.then((fileStatVal) => {
			let infoStr = 'create time : ' + new Date(fileStatVal.ctime).toLocaleDateString() +
				'\nmodify time : ' + new Date(fileStatVal.mtime).toLocaleDateString() +
				'\nsize : ' + fileStatVal.size;
			vscode.window.showInformationMessage(infoStr);
			console.log(infoStr);
		}, () => {
			console.log('fail');
		});
	});

    // 注册到监听队列中
    context.subscriptions.push(showFileStatCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}
