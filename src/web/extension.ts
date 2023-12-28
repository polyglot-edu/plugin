// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';


//path for the media of the button in treeview (HOME)
const HomeItem = path.join(__dirname, 'media', 'Bell2.png');
console.log(HomeItem);

let rememberLearningPath = '';
let rememberId = '';
let rememberTypeQuiz = '';
let rememberTipologyQuiz = '';

//generate the treeview to see different button or only one in the primary sidebar
class TreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
	onDidChangeTreeData?: vscode.Event<TreeItem | null | undefined> | undefined;
	data: TreeItem[];

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

	getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
	  return element;
	}
  
	getChildren(
	  element?: TreeItem | undefined
	): vscode.ProviderResult<TreeItem[]> {
	  if (element === undefined) {
		return this.data;
	  }
	  return element.children;
	}
  }

class TreeItem extends vscode.TreeItem {
	children: TreeItem[]|undefined;
  
	constructor(label: string, children?: TreeItem[]) {

		super(
		  label,
		  children === undefined ? vscode.TreeItemCollapsibleState.None :
								   vscode.TreeItemCollapsibleState.Expanded);
	  this.children = children;
	}
  }

//class which describe the component of the buttons in primary stage
class Home extends TreeItem {
  
	constructor(label: string) {
		super(label);
		const iconPath = vscode.Uri.file(HomeItem).with({ scheme: 'vscode-resource' });
		this.iconPath = iconPath;


	  
	}	
	command = {
		command: 'extension.welcome',
		title: 'Welcome',
	};
}
  
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-sample" is now active!');

	//register the command to show the treeview component
	vscode.window.registerTreeDataProvider('nodeDependencies',new TreeDataProvider());
	vscode.commands.registerCommand('treeExplorer.openFile', (resource: vscode.Uri) => {
		vscode.window.showTextDocument(resource);
	});
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showErrorMessage("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	});

	//command to launch the extension code 
	vscode.commands.registerCommand('extension.welcome', () => {
		const panel = vscode.window.createWebviewPanel(
			'welcome',
			'welcome',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		panel.title = 'Polyglot';
		panel.webview.html = getWebviewContent();
		//to comunicacion between webview and the vscode ts file
		panel.webview.onDidReceiveMessage(message => {
			//console.log(message);
			//switch to understand what command was send
			switch (message.command) {
				//when the message is apriNotebook you do his actions
				case 'apriNotebook':
					
					//const htmlPath = vscode.Uri.joinPath(context.extensionUri,'notebooks', 'ciao.ipynb');
					//vscode.commands.executeCommand('vscode.open', htmlPath);
					
					/*const notebookPath = vscode.Uri.joinPath(context.extensionUri, 'notebook', 'menunote.html');

					vscode.env.openExternal(notebookPath);
					*/

					console.log('Received apriNotebook command. elementoCliccato:', message.elementoCliccato);

					rememberLearningPath = message.elementoCliccato;

					console.log('Received aprNotebook command. idElementoCliccato:', message.idElementoCliccato);

					//rememberId = message.idElementoCliccato;
					rememberId = '3aaa2e43-3be9-4b52-87c9-c88eeafa6e60';
					console.log(rememberId);

					vscode.commands.executeCommand('extension.page2');

					break;
    			
			}
		},
			undefined,
			context.subscriptions
		);		
	})

	vscode.commands.registerCommand('extension.page2', () =>{
		const panel = vscode.window.createWebviewPanel(
			'page2',
			'page2',
			vscode.ViewColumn.Two,
			{enableScripts: true}
		)

		panel.title = 'Test Description';
		panel.webview.html = getDescriptionPage(rememberLearningPath,rememberId);
		panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {

				case 'openTypeQuiz':
					
					console.log('Received apriNotebook command. elementoCliccato:', message.Question);

					//rememberTypeQuiz = message.Question;
					rememberTypeQuiz = 'webapp';
					console.log(rememberTypeQuiz);

					rememberTipologyQuiz = message.Type;

					if(rememberTypeQuiz == 'vscode'){

						//open notebook for the coding exercise
					}else{

						const externalPageUrl = vscode.Uri.parse(`http://127.0.0.1:3000/?rememberId=${encodeURIComponent(rememberId)}&rememberLearningPath=${encodeURIComponent(rememberLearningPath)}&rememberTipologyQuiz=${encodeURIComponent(rememberTipologyQuiz)}`);
						vscode.env.openExternal(externalPageUrl);					}

					break;
    			
			}
		},
			undefined,
			context.subscriptions
		);

	})

	context.subscriptions.push(disposable);
}


//function to give to the webview his frontend
function getWebviewContent() {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Welcome</title>

		<link rel="stylesheet" href="https://unpkg.com/vscode-codicons@4.0.0/dist/codicon.css">
    	<link rel="stylesheet" href="https://unpkg.com/vscode-codicons@4.0.0/dist/codicon.css">
  
	<style>

		body{
			font-family: 'Arial', sans-serif;
		}

		body.vscode-dark{
			background-color: var(--vscode-editor-background);
			color: var(--vscode-foreground);
		}

		body.vscode-light{
			background-color: var(--vscode-editor-background);
			color: var(--vscode-foreground);
		}
  
	  .total_screen{
		margin: 0;
		padding: 0;
		overflow: hidden;
		height: 100vh;
	  }
  
	  .first_line{
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--vscode-editor-foreground);
  
		.Bell {
			width: 40px;
			height: 39px;
			background-color: transparent;
			cursor: pointer;
			display: inline-block;
		}
	
		.Bell.vscode-button {
			background: transparent;
			border: 0;
			box-shadow: none;
			padding: 0;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			height: 30px;
			width: 29px;
			border-radius: 4px;
			overflow: hidden;
		}
	
		/* Regola l'immagine per adattarla alle dimensioni del bottone */
		.Bell.vscode-button .bell-image {
			width: 100%;
			height: 100%;
			object-fit: cover; /* Adatta l'immagine mantenendo le proporzioni */
		}

		.Question {
			width: 27px;
			height: 26px;
			background-color: transparent;
			cursor: pointer;
			display: inline-block;
		}
	
		.Question.vscode-button {
			background: transparent;
			border: 0;
			box-shadow: none;
			padding: 0;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			curs.or: pointer;
			height: 27px;
			width: 26px;
			border-radius: 4px;
			overflow: hidden;
		}
	
		/* Regola l'immagine per adattarla alle dimensioni del bottone */
		.Question.vscode-button .question-image {
			width: 100%;
			height: 100%;
			object-fit: cover; /* Adatta l'immagine mantenendo le proporzioni */
		}
		
		.Mask {
			width: 30px;
			height: 29px;
			background-color: transparent;
			cursor: pointer;
			display: inline-block;
		}
	
		.Mask.vscode-button {
			background: transparent;
			border: 0;
			box-shadow: none;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			height: 39px;
			width: 38px;
			border-radius: 4px;
			overflow: hidden;
		}
	
		/* Regola l'immagine per adattarla alle dimensioni del bottone */
		.Mask.vscode-button .mask-image {
			width: 70%;
			height: 70%;
		}

		.path{
  
			font-size: 15px;
			margin-top: 0px;
			color: var(--vscode-editor-foreground);
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
		border-bottom: 1px solid var(--vscode-editor-foreground);
  
		.bar{
  
		  margin-right: 5px;
		  width: 100%;
  
		  .searchInput{
  
			width: 75%; 
			height: 20px; 
			border: 1px solid var(--vscode-input-border);
        	background-color: var(--vscode-input-background);
        	color: var(--vscode-input-foreground);
        	padding: 4px 8px;
        	border-radius: 3px;
        	outline: none;   
		  }
		  .searchInput::placeholder {
			color: var(--vscode-input-placeholderForeground);
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
		overflow-y: auto; /* Abilita lo scrolling verticale all'interno della terza linea */
		max-height: 400px; /* Altezza massima della div terza linea */
		margin-top: 40px;
		
		.button{
  
			width: 82%;
			min-height: 100px; /* Altezza minima desiderata per i bottoni */
			max-height: 150px; /* Altezza massima desiderata per i bottoni */
			background-color: var(--vscode-input-background);
			color: var(--vscode-input-foreground);
			border: 1px solid var(--vscode-input-border);
			padding: 2px 5px;
			margin-bottom: 5px;
			border-radius: 4px;
		}  
	  }

	</style>
	</head>
	<body>
	  <div class="total_screen">
		<div class= "first_line">
			<img src="https://i.postimg.cc/yNNSbWdG/logo-polyglot-1.png" style="width: 120px; height: 61px;">
			<h1 class="path">Path</h1>
			<div class="button1">
			<!-- Bottone con classe Bell -->
				<button class="Bell vscode-button">
					<img class="bell-image" src="https://i.postimg.cc/nrXMwm3h/download-2-jfif.png" alt="Bell Image">
				</button>
			  	<button class="Question vscode-button">
					<img class="question-image" src="https://i.postimg.cc/ZKTJRp8B/download-1.png" alt="Question Image">
				</button>
			  	<button class="Mask vscode-button">
					<img class="mask.image" src="https://i.postimg.cc/J42nm1pv/Mask-Group-1.png" alt="Mark Image">
				</button>
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
			  <select id="option1" class="option1" style="font-size: 13px; width: 200px; height: 25px; background-color: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); padding: 2px 5px;">
				<option></option>
			  </select>  
			</div>
			<div class="tent2">
			  <h1 class="h2" style="color:lightgrey">Concepts</h1>
			  <select id="option2" style="font-size: 13px; width: 200px; height: 25px;background-color: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); padding: 2px 5px;">
				<option></option>
			  </select>
			</div>
		  </div>
		</div>  
		<div class="third_line"></div>
	  </div>
	  <script>
		(function(){
			const vscode = acquireVsCodeApi();

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

				const matchingItem = data.find(item => item.title === titles[i]);
				const id = matchingItem ? matchingItem._id : null;

                const bottone = document.createElement("button");
                bottone.className = "button";
				bottone.setAttribute('id', id);
				bottone.setAttribute('titles', titles[i]);
				bottone.setAttribute('skills', names[i]);
				bottone.setAttribute('concepts', names[i]);
				var tit = bottone.getAttribute('titles');
                bottone.innerText = tit;
                thirdLine.appendChild(bottone);

                bottone.addEventListener("click", function(event) {

					rememberId = event.target.id;
					console.log(rememberId);
					//add the title to the global variable to remember the path clicked
					rememberLearningPath = event.target.innerText;
					console.log(rememberLearningPath);

                    vscode.postMessage({
                        command: 'apriNotebook',
                        elementoCliccato: rememberLearningPath,
						idElementoCliccato: rememberId
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

function getDescriptionPage(learningPath: string, IdPath: string){
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>DescriptionNotebook</title>

		<link rel="stylesheet" href="https://unpkg.com/vscode-codicons@4.0.0/dist/codicon.css">
    	<link rel="stylesheet" href="https://unpkg.com/vscode-codicons@4.0.0/dist/codicon.css">
  
	    <style>
            body{
			font-family: 'Arial', sans-serif;
		}

		body.vscode-dark{
			background-color: var(--vscode-editor-background);
			color: var(--vscode-foreground);
		}

		body.vscode-light{
			background-color: var(--vscode-editor-background);
			color: var(--vscode-foreground);
		}
  
	  .total_screen{
		margin: 0;
		padding: 0;
		overflow: hidden;
		height: 100vh;
	  }
  
	  .first_line{
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--vscode-editor-foreground);

		.path{
  
		  font-size: 15px;
		  margin-top: 0px;
		  color: var(--vscode-editor-foreground);
		  padding-left: 30px;
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
        align-items: left;
        border-bottom: 1px solid var(--vscode-editor-foreground);
        margin-top: 27px;
        margin-left: 12px;
        flex-direction: column;
		min-height: 76%;


        .h1{
            font-size: 15px;
		    margin-top: 0px;
		    color: var(--vscode-editor-foreground);
		    padding-left: 30px;
        }
      }

	  .third_line{
		display: flex;
		align-items: center;
		justify-content: center;

		.nextQuiz{
			margin-top: 10px;
			width: 30%;
			min-height: 60px; /* Altezza minima desiderata per i bottoni */
			max-height: 80px; /* Altezza massima desiderata per i bottoni */
			background-color: var(--vscode-input-background);
			color: var(--vscode-input-foreground);
			border: 1px solid var(--vscode-input-border);
			padding: 2px 5px;
			margin-bottom: 5px;
			border-radius: 4px;
		
		}
	  }
      
	    </style>
	</head>
	    <body>
	        <div class="total_screen">
                <div class= "first_line">
                    <img src="https://i.postimg.cc/yNNSbWdG/logo-polyglot-1.png" style="width: 120px; height: 61px;">
                    <h1 class="path">Learning Path</h1>
                </div>
                <div class="second_line" id="second_line">
                    <h1 class="theory">Theory</h1>
                    <h1 class="description" id="description"></h1>
                </div>
				<div class="third_line">
					<button class="nextQuiz">Next Quiz</button>
				</div>
            </div>

<script type="module">

    (function(){

		const vscode = acquireVsCodeApi();

        const apiUrl = 'https://polyglot-api.polyglot-edu.com/api/flows';

        // Aggiungi un ID all'elemento "description" per facilitare la selezione
        const descriptionElement = document.querySelector('.second_line .description');

		//let ciaone = "Introduction Applied Machine Learning"

		const learningPath = '${learningPath}'; // Usa il valore passato come parametro
		console.log(learningPath);

		const learningId = '${IdPath}';
		console.log(learningId);

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Find the first item that matches the condition
                const matchingItem = data.find(item => item.title === learningPath );

                if (matchingItem) {
                    // If a matching item is found, set the description
                    descriptionElement.textContent = matchingItem.description;
                    console.log(matchingItem.description);
                } else {
                    // Handle the case where no matching item is found
                    console.error('No matching item found for', learningPath);
                }
            })
            .catch(error => console.error('Error during API request:', error));


			const nextQuizButton = document.querySelector('.nextQuiz');
			nextQuizButton.addEventListener('click', function(){

				console.log('button clicked');

				const apiUrl = 'https://polyglot-api.polyglot-edu.com/api/execution/first';
				
				//data to send in the POST request
				const postData = {
					flowId: learningId
				};

				const requestOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(postData)
				};

				//do the call to the API
				fetch(apiUrl, requestOptions)
					.then(response => {
						if(!response.ok){
							throw new Error('Error in the request');
						}
						return response.json();
					})
					.then(data => {
						console.log('data received:', data);

						const question = data.firstNode.data.question;
						const typeQuiz = data.firstNode.runtimeData.challengeContent[0].type;

						vscode.postMessage({
							command: 'openTypeQuiz',
							Question: question,
							Type: typeQuiz
						});

					})
					.catch(error => {
						console.error('Errore nella chiamata API:', error.message);
					});
			})
    }());
</script>
	    </body>
	</html>`;
}