"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
const ItemCiao = path.join(path.dirname(__dirname), 'ciao.html');
const HomeItem = path.join(path.dirname(__dirname), 'media/home_FILL1_wght500_GRAD0_opsz48 1.svg');
class TreeDataProvider {
    constructor() {
        this.data = [
            //new TreeItem('cars', [
            new Home('HOME'),
            //new TreeItem('BMW', [
            //new TreeItem('320'),
            //new TreeItem('X3'),
            //new TreeItem('X5')
            //])
            //])
        ];
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    }
}
class TreeItem extends vscode.TreeItem {
    constructor(label, children) {
        super(label, children === undefined ? vscode.TreeItemCollapsibleState.None :
            vscode.TreeItemCollapsibleState.Expanded);
        this.children = children;
    }
}
class Home extends TreeItem {
    constructor(label) {
        super(label);
        this.command = {
            command: 'extension.welcome',
            title: 'Welcome',
            arguments: [ItemCiao]
        };
        const iconPath = vscode.Uri.file(HomeItem);
        this.iconPath = iconPath;
    }
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "helloworld-sample" is now active!');
    vscode.window.registerTreeDataProvider('nodeDependencies', new TreeDataProvider());
    vscode.commands.registerCommand('treeExplorer.openFile', (resource) => {
        vscode.window.showTextDocument(resource);
    });
    /*vscode.commands.registerCommand('extension.openFile', (resource) => {
        vscode.commands.executeCommand('vscode.open', vscode.Uri.file(resource));
    });*/
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
        panel.title = 'Cat';
        console.log("call the function");
        panel.webview.html = getWebviewContent();
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
                //case 'openPath': panel.webview.html = getNew();
            }
        }, undefined, context.subscriptions);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function getWebviewContent() {
    console.log("in the function");
    return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Welcome</title>
  
	<style>
  
	  .total_screen{
  
		background-color: white;
	  }
  
	  .first_line{
		display: flex;
		align-items: center;
		position: relative;
  
  
  
		.Bell{
		  width: 30px; 
		  height: 31px; 
		  background-image: url('https://i.postimg.cc/gjCQ9yVB/Bell.jpg'); 
		  background-size: cover; 
		  border: none; 
		  cursor: pointer; 
		}
		.Question{
		  width: 31px; 
		  height: 31px; 
		  background-image: url('https://i.postimg.cc/G2Vd2yPv/Question-Circle.jpg'); 
		  background-size: cover; 
		  border: none;
		  cursor: pointer; 
		  background-repeat: no-repeatp  
		}
		.Mask{
		  width: 31px; 
		  height: 31px;
		  background-image: url('https://i.postimg.cc/J7XWxtcd/Mask-Group.jpg'); 
		  background-size: cover; 
		  border: none;
		  cursor: pointer;
		}
		.path{
  
		  font-size: 15px;
		  margin-top: 0px;
		  color: lightgray;
		  padding-left: 30px;
		}
  
		.button1{
  
		  margin-left: auto;
		  margin-right: 6px;
		  position: relative;
		}
	  }
	  .first_line::before{
		content: " ";
		position: absolute;
		left: 0;
		top: 70px;
		height: 1px;
		width: 100%;
		border-bottom: 1px solid lightgrey;
	  }
  
	  .second_line{
  
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center; 
		margin-top: 20px; 
  
		.bar{
  
		  margin-right: 5px;
		  width: 100%;
  
		  .searchInput{
  
			width: 75%; 
			height: 20px;    
		  }
		}
  
		.allign1{
  
		  display: flex;
		  justify-content: space-between;
		  width: 100%;
  
  
		  .tent1{
  
		  display: flex;
		  flex-direction: column;
		  align-items: start;
		  font-size: 9px;
		  margin-top: 10px;
		  margin-left: 24%;
		  }
  
		  .tent2{
  
			display: flex;
			flex-direction: column;
			align-items: start;
			font-size: 9px;
			margin-top: 10px;
			margin-right: 16%;
  
		  }
		}
  
	  }
  
	  .third_line{
  
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin-top: 40px;
  
		.button{
  
		  width: 82%;
		  height: 100px;
		  cursor: pointer; 
		  background-size: cover; 
		  background-repeat: no-repeat; 
		  background-color: white;   
		  border-radius: 10px;
		  border-color: lightgray;
		  margin-bottom: 10px;
		}  
	  }
  
	</style>
	</head>
	<body>
	  <div class="total_screen">
		<div class= "first_line">
			<img src="https://i.postimg.cc/YSBrNgTR/Logo.jpg">
			<h1 class="path">Path</h1>
			<div class="button1">
			  <button class="Bell"></button>
			  <button class="Question"></button>
			  <button class="Mask"></button>
			</div>
		</div>  
		<div class="second_line">
		  <h1 class="write1"><b>Learning path selection</b></h1>
		  <div class="bar">
			<input type="text" class="searchInput" placeholder="Cerca..."></input>
			<button style="color: white; background-color: black;">Search</button>
		  </div>
		  <div class="allign1">
			<div class="tent1">
			  <h1 class="h1" style="color:lightgrey">Skills</h1>
			  <select class="option1" style="font-size: 13px; width: 200px; height: 25px;">
				<option value="option1">Skills</option>
				<option value="option2">Option1</option>
				<option value="option3">Option2</option>
			  </select>  
			</div>
			<div class="tent2">
			  <h1 class="h2" style="color:lightgrey">Concepts</h1>
			  <select style="font-size: 13px; width: 200px; height: 25px;">
				<option value="option1">Concepts</option>
				<option value="option2">Option1</option>
				<option value="option3">Option2</option>
			  </select>
			</div>
		  </div>
		</div>  
		<div class="third_line"></div>
	  </div>
	  <script>
	  <!DOCTYPE html>
	  <html lang="en">
	  <head>
		  <meta charset="UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <title>Welcome</title>
	
	  <style>
	
		.total_screen{
	
		  background-color: white;
		}
	
		.first_line{
		  display: flex;
		  align-items: center;
		  position: relative;
	
	
	
		  .Bell{
			width: 30px; 
			height: 31px; 
			background-image: url('https://i.postimg.cc/gjCQ9yVB/Bell.jpg'); 
			background-size: cover; 
			border: none; 
			cursor: pointer; 
		  }
		  .Question{
			width: 31px; 
			height: 31px; 
			background-image: url('https://i.postimg.cc/G2Vd2yPv/Question-Circle.jpg'); 
			background-size: cover; 
			border: none;
			cursor: pointer; 
			background-repeat: no-repeatp  
		  }
		  .Mask{
			width: 31px; 
			height: 31px;
			background-image: url('https://i.postimg.cc/J7XWxtcd/Mask-Group.jpg'); 
			background-size: cover; 
			border: none;
			cursor: pointer;
		  }
		  .path{
	
			font-size: 15px;
			margin-top: 0px;
			color: lightgray;
			padding-left: 30px;
		  }
	
		  .button1{
	
			margin-left: auto;
			margin-right: 6px;
			position: relative;
		  }
		}
		.first_line::before{
		  content: " ";
		  position: absolute;
		  left: 0;
		  top: 70px;
		  height: 1px;
		  width: 100%;
		  border-bottom: 1px solid lightgrey;
		}
	
		.second_line{
	
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  text-align: center; 
		  margin-top: 20px; 
	
		  .bar{
	
			margin-right: 5px;
			width: 100%;
	
			.searchInput{
	
			  width: 75%; 
			  height: 20px;    
			}
		  }
	
		  .allign1{
	
			display: flex;
			justify-content: space-between;
			width: 100%;
	
	
			.tent1{
	
			display: flex;
			flex-direction: column;
			align-items: start;
			font-size: 9px;
			margin-top: 10px;
			margin-left: 24%;
			}
	
			.tent2{
	
			  display: flex;
			  flex-direction: column;
			  align-items: start;
			  font-size: 9px;
			  margin-top: 10px;
			  margin-right: 16%;
	
			}
		  }
	
		}
	
		.third_line{
	
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  width: 100%;
		  margin-top: 40px;
	
		  .button{
	
			width: 82%;
			height: 100px;
			cursor: pointer; 
			background-size: cover; 
			background-repeat: no-repeat; 
			background-color: white;   
			border-radius: 10px;
			border-color: lightgray;
			margin-bottom: 10px;
		  }  
		}
	
	  </style>
	  </head>
	  <body>
		<div class="total_screen">
		  <div class= "first_line">
			  <img src="https://i.postimg.cc/YSBrNgTR/Logo.jpg">
			  <h1 class="path">Path</h1>
			  <div class="button1">
				<button class="Bell"></button>
				<button class="Question"></button>
				<button class="Mask"></button>
			  </div>
		  </div>  
		  <div class="second_line">
			<h1 class="write1"><b>Learning path selection</b></h1>
			<div class="bar">
			  <input type="text" class="searchInput" placeholder="Cerca..."></input>
			  <button style="color: white; background-color: black;">Search</button>
			</div>
			<div class="allign1">
			  <div class="tent1">
				<h1 class="h1" style="color:lightgrey">Skills</h1>
				<select class="option1" style="font-size: 13px; width: 200px; height: 25px;">
				  <option value="option1">Skills</option>
				  <option value="option2">Option1</option>
				  <option value="option3">Option2</option>
				</select>  
			  </div>
			  <div class="tent2">
				<h1 class="h2" style="color:lightgrey">Concepts</h1>
				<select style="font-size: 13px; width: 200px; height: 25px;">
				  <option value="option1">Concepts</option>
				  <option value="option2">Option1</option>
				  <option value="option3">Option2</option>
				</select>
			  </div>
			</div>
		  </div>  
		  <div class="third_line"></div>
		</div>
		<script>
		  (function(){
	  const url = 'https://polyglot-api.polyglot-edu.com/api/flows';
  
	  fetch(url)
		  .then((response) => {
			  return response.json();
		  })
		  .then((data) => {
			  const filteredData = data.filter(item => {
				  const title = item.title.toLowerCase();
				  return !(title.includes("untitled") || title.includes("test") || title.includes("untit") || title.includes("grtet") || title.includes("dere") || title.includes("te"));
			  });
  
			  const titles = filteredData.map(item => item.title);
  
			  const thirdLine = document.querySelector(".third_line");
  
			  for (let i = 0; i < titles.length; i++) {
				  const bottone = document.createElement("button");
				  bottone.className = "button";
				  bottone.innerText = titles[i];
				  thirdLine.appendChild(bottone);
  
				  bottone.addEventListener("click", function(event) {
					  const vscode = acquireVsCodeApi();
					  vscode.postMessage({
						  command: 'apriNotebook',
						  elementoCliccato: event.target.innerText
					  });
				  });
			  }
		  })
		  .catch(function(error) {
			  console.log(error);
		  });
  }());
		  </script>
	  </body>
	  </html>
		</script>
	</body>
	</html>`;
}
//# sourceMappingURL=extension.js.map