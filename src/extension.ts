import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('logbook.createMarkdownFile', () => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const fileName = `${currentDate}.md`.replace(/-/g, ".");

        const systemLocale = vscode.env.language;
        const formattedDate = new Date(currentDate).toLocaleDateString(systemLocale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder found. Please open a folder first');
            return;
        }

        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        const activeFolderPath = path.dirname(vscode.Uri.parse(activeEditor.document.uri.toString()).fsPath);
        
        const filePath = `${activeFolderPath}/${fileName}`;
        const content = `# ${formattedDate}\n`;

        // const filePath = vscode.workspace.workspaceFolders[0].uri.fsPath + '/' + fileName;

        try {
            fs.writeFileSync(filePath, content, 'utf-8');
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
