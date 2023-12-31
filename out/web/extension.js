"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
//path for the media of the button in treeview (HOME)
const HomeItem = path.join(path.dirname(__dirname), 'media/home.png');
//generate the treeview to see different button or only one in the primary sidebar
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
//class which describe the component of the buttons in primary stage
class Home extends TreeItem {
    constructor(label) {
        super(label);
        this.command = {
            command: 'extension.welcome',
            title: 'Welcome',
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
    //register the command to show the treeview component
    vscode.window.registerTreeDataProvider('nodeDependencies', new TreeDataProvider());
    vscode.commands.registerCommand('treeExplorer.openFile', (resource) => {
        vscode.window.showTextDocument(resource);
    });
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showErrorMessage("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    });
    //command to launch the extension code 
    vscode.commands.registerCommand('extension.welcome', () => {
        const panel = vscode.window.createWebviewPanel('welcome', 'welcome', vscode.ViewColumn.One, { enableScripts: true });
        panel.title = 'Polyglot';
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
            }
        }, undefined, context.subscriptions);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//function to give to the webview his frontend
function getWebviewContent() {
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
		  margin-left: 16%;
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
		min-height: 200px; /* Altezza minima del contenitore dei bottoni */

  
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
			<input type="text" id="searchInput" class="searchInput" placeholder="Cerca..."></input>
		  </div>
		  <div class="allign1">
			<div class="tent1">
			  <h1 class="h1" style="color:lightgrey">Skills</h1>
			  <select id="option1" class="option1" style="font-size: 13px; width: 200px; height: 25px;">
				<option></option>
			  </select>  
			</div>
			<div class="tent2">
			  <h1 class="h2" style="color:lightgrey">Concepts</h1>
			  <select id="option2" style="font-size: 13px; width: 200px; height: 25px;">
				<option></option>
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

			//put all the real data in a new variable to put out untitled flowpath
            const filteredData = data.filter(item => {
                const title = item.title.toLowerCase();
                return !(title.includes("untitled") || title.includes("test") || title.includes("untit") || title.includes("grtet") || title.includes("dere") || title.includes("te"));
            });

			//save all the title in a variable 
            const titles = filteredData.map(item => item.title);
            const thirdLine = document.querySelector(".third_line");

			//create a variable names with the same length of data , for now is all empty
			var names = new Array(filteredData.length).fill([]);  

			//iterate  all of the element that have a title
			filteredData.forEach(function(item, index) {
  				// Verify if tags have an element or if it is empty
  				if (item.tags && item.tags.length > 0) {
					// create an array of name if tag isn't empty
					const tagNames = item.tags.map(tag => tag.name);
					//add array name 
					names[index] = tagNames;
  				} else {
					//if the tag is empty I add an empty element in names
					names[index] = [];
  				}
			});
			//now I have a variable with all the names respect of the tag and so the different path flow

			//variable to save univoce name
			const uniqueNames = {};

			// Iterate all the element that have a title
			filteredData.forEach(item => {
  				// extract the tag
  				const tags = item.tags;

  				// interate in the tag objects
  				tags.forEach(tag => {
   			 		// extract the name tag
    				const name = tag.name;

    				// Verify if the name was already see
    				if (!uniqueNames[name]) {
      					// if the name was alrealdy save i put it in the uniquenames
      					uniqueNames[name] = true;
    				}
  				});
			});

			// extract all the unique name in an array
			const skill = Object.keys(uniqueNames);
			const concept = Object.keys(uniqueNames);
			

            for (let i = 0; i < titles.length; i++) {
                const bottone = document.createElement("button");
                bottone.className = "button";
				bottone.setAttribute('titles', titles[i]);
				bottone.setAttribute('skills', names[i]);
				bottone.setAttribute('concepts', names[i]);
				var tit = bottone.getAttribute('titles');
                bottone.innerText = tit;
                thirdLine.appendChild(bottone);

                bottone.addEventListener("click", function(event) {
                    const vscode = acquireVsCodeApi();
                    vscode.postMessage({
                        command: 'apriNotebook',
                        elementoCliccato: event.target.innerText
                    });
                });
            }

			const selectDropdown = document.getElementById("option1");
			// interate in the name and save only unique name
			skill.forEach(name => {
    			const option = document.createElement("option");
    			option.value = name; //the value of the option is the name
    			option.text = name;  // the text in the option is the name
    			selectDropdown.appendChild(option); // add the option in the tent menu 1
			});

			const selectDropdown2 = document.getElementById("option2");
			//interate in the name and save only unique name			
			concept.forEach(name => {
    			const option = document.createElement("option");
    			option.value = name; //the value of the option is the name
    			option.text = name;  // the text in the option is the name
    			selectDropdown2.appendChild(option); // add the option in the tent menu 2
			});

			const searchInput = document.getElementById("searchInput");
			const buttons = document.querySelectorAll(".button");

			//function to put visible or invisible all the button in the webview
			function updateButtonVisibility() {
    			const selectedSkill = selectDropdown.value.toLowerCase();
				const selectedConcept = selectDropdown2.value.toLowerCase();
    			const searchText = searchInput.value.toLowerCase();

    			buttons.forEach(button => {
        			const buttonSkills = button.getAttribute("skills").toLowerCase();
					const buttonConcepts = button.getAttribute("concepts").toLowerCase();
        			const buttonTitle = button.innerText.toLowerCase();
					
					if (buttonSkills.includes(selectedSkill) && buttonTitle.includes(searchText) && buttonConcepts.includes(selectedConcept)) {
            			button.style.display = "block";
        			} else {
            			button.style.display = "none";
        			}
    			});
			}

			selectDropdown.addEventListener("change", updateButtonVisibility);
			selectDropdown2.addEventListener("change", updateButtonVisibility);
			searchInput.addEventListener("input", updateButtonVisibility);
        })
        .catch(function(error) {
            console.log(error);
        });
}());
		</script>
	</body>
	</html>`;
}
//# sourceMappingURL=extension.js.map