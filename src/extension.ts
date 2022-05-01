// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

namespace Tools {
	export const KB = 1024;
	export const MB = KB * 1024;
	export const GB = MB * 1024;
	export const TB = GB * 1024;
	export const fileSizeScale : any = [
		[TB, 'TB'],
		[GB, 'GB'],
		[MB, 'MB'],
		[KB, 'KB'],
	];
};

function toHumanReadableFileSize(byteSize : number) : string {
	for (let i = 0; i < Tools.fileSizeScale.length; i++) {
		let base : number = Tools.fileSizeScale[i][0];
		if (byteSize < base) {
			continue;
		}
		let res : string = (byteSize / base).toFixed(2) + ' ' + Tools.fileSizeScale[i][1] +
			' (' + byteSize + ' B)';
		return res;
	}

	return byteSize + ' B';
}

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
		fileStat.then((fileStatVal : vscode.FileStat) => {
			const cDate = new Date(fileStatVal.ctime);
			const mDate = new Date(fileStatVal.mtime);
			let msgArr = [
				'size: ' + toHumanReadableFileSize(fileStatVal.size),
				'ctime: ' + cDate.toLocaleString(),
				'mtime: ' + mDate.toLocaleString(),
			];
			let title = '';
			if (fileStatVal.permissions != undefined) {
				title += '[' + fileStatVal.permissions?.toString() + ']';
			}
			if (fileStatVal.type == 2) { // directory
				title += 'dir';
			} else {
				title += 'file' + msgArr[0];
			}
			let options = { detail: msgArr.join('\n'), modal: false};
			vscode.window.showInformationMessage<string>(title, options, msgArr[1], msgArr[2]);
			console.log(msgArr.join('\n'));
		}, () => {
			vscode.window.showInformationMessage('fail');
			console.log('fail');
		});
	});

    // 注册到监听队列中
    context.subscriptions.push(showFileStatCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}
