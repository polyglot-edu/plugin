"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
const extension_1 = require("./extension");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "helloworld-sample" is now active!');
    const rootPath = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0
        ? vscode.workspace.workspaceFolders[0].uri.fsPath
        : defined;
    const nodeDependenciesProvider = new extension_1.NodeDependenciesProvider(rootPath);
    const treeView = vscode.window.createTreeView('nodeDependencies', {
        treeDataProvider: nodeDependenciesProvider
    });
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showErrorMessage("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    });
    vscode.commands.registerCommand('extension.welcome', () => {
        const panel = vscode.window.createWebviewPanel('welcome', 'welcome', vscode.ViewColumn.One, { enableScripts: true });
        nodeDependenciesProvider.onDidChangeTreeData(selectedItem => {
            if (selectedItem) {
                // Invia un messaggio alla webview con le informazioni sull'elemento selezionato
                panel.webview.postMessage({ command: 'updateContent', selectedItem: selectedItem.label });
            }
        });
        panel.title = 'Cat';
        console.log("call the function");
        panel.webview.html = (0, extension_1.getWebviewContent)();
        //to comunicacion between webview and the vscode ts file
        panel.webview.onDidReceiveMessage(message => {
            //console.log(message);
            //switch to understand what command was send
            switch (message.command) {
                //when the message is apriNotebook you do his actions
                case 'apriNotebook':
                    // Obtain the complete path of Notebook Jupiter file --> test.ipynb
                    const notebookPath = path.join(path.dirname(__dirname), 'notebooks', 'test.ipynb');
                    //Open Jupyter Notebook file with the text editor 
                    vscode.commands.executeCommand('vscode.open', vscode.Uri.file(notebookPath));
                    return;
                case 'apriHtml':
                    const htmlPath = path.join(path.dirname(__dirname), 'notebooks', 'html.ipynb');
                    vscode.commands.executeCommand('vscode.open', vscode.Uri.file(htmlPath));
                case 'updateContent':
                    // Aggiorna il contenuto della webview in base all'elemento selezionato
                    (0, extension_1.updateWebviewContent)(message.selectedItem);
                    return;
            }
        }, undefined, context.subscriptions);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=activate.js.map