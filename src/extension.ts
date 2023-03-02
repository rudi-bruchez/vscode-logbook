import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('logbook.createMarkdownFile', () => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const fileName = `${currentDate}.md`;

        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found. Please open a folder first');
            return;
        }

        const filePath = vscode.workspace.workspaceFolders[0].uri.fsPath + '/' + fileName;

        try {
            fs.writeFileSync(filePath, '', 'utf-8');
            vscode.window.showInformationMessage(`File ${fileName} created successfully.`);
        } catch (err: NodeJS.ErrnoException | unknown) {
            if (err instanceof Error) {
                vscode.window.showErrorMessage(err.message);
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
