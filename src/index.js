import "./styles.css";
import { displayProjects, displayElementsInContent } from "./dom.js";



// Constructors for todos and projects
class Todo {
    constructor(title, description, dueDate, priority, completed = false, uniqueId) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.uniqueId = Math.floor(Math.random() * 10000);
    }

    markTodoAsComplete() {
        this.completed = true;
        saveToLocalStorage();
    }


    markTodoAsIncomplete() {
        this.completed = false;
        saveToLocalStorage();
    }

    changeTodoPriority(priority) {
        this.priority = priority;
    }

    pushTodoToArray() {
        if (currentProjectIndex === undefined || currentProjectIndex === -1) {
            myProjects[0].todos.push(this); // Push to the first project, i.e., defaultProject
        } else {
            myProjects[currentProjectIndex].todos.push(this); // Push to the selected project
        }
    }

    viewTodo() {
        console.log(this);
    }

    editTodo(newTitle, newDueDate, newCompleted) {
        this.title = newTitle;
        this.dueDate = newDueDate;
        this.completed = newCompleted;
        saveToLocalStorage();
        
    }

    deleteTodo() {
        let uniqueIdOfTodo = this.uniqueId;
        currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(
            (todo) => todo.uniqueId == uniqueIdOfTodo
        );
        delete myProjects[currentProjectIndex].todos[currentTodoIndex];
    }
}

class Project {
    constructor(title, todos = [], uniqueId) {
        this.title = title;
        this.todos = todos;
        this.uniqueId = Math.floor(Math.random() * 10000);
    }

    pushProjectToArray() {
        myProjects.push(this);
    }

    currentProjectIdentifier() {
        let uniqueIdOfProject = this.uniqueId;
        currentProjectIndex = myProjects.findIndex(
            (project) => project !== undefined && project.uniqueId == uniqueIdOfProject
        );
        console.log(`${currentProjectIndex} is the current project index!`);
        return currentProjectIndex;
    }

  

    viewTodos() {
        return this.todos.map((todo) => {
            return { title: todo.title, dueDate: todo.dueDate };
        });
    }


    static viewAllProjects() {
        return myProjects
            .filter(project => project !== null && project !== undefined) // Filter out null and undefined values
            .map((project) => ({
                title: project.title,
                uniqueId: project.uniqueId,
            }));
    }
    
}


// varaibles 
const projectDiv = document.querySelector("#project-div");
let  myProjects;

let isLocalStorageNull = isLocalStorageNullChecker();
if(isLocalStorageNull == true) {
    myProjects = [];
    saveToLocalStorage();
}
else if(isLocalStorageNull == false) {
    myProjects = retrieveFromLocalStorage();
};


let currentProjectIndex;
let currentTodoIndex;



function isLocalStorageNullChecker() {
    let data = retrieveFromLocalStorage();

    if (data == null) {
        return true; // Returns true if data is null
    } else {
        return false; // Returns false if data exists
    }
}


// local storage!


function saveToLocalStorage() {
        localStorage.setItem("myProjectsLocalStorageArray",JSON.stringify(myProjects));
};



function retrieveFromLocalStorage() {
    
    let storedData = JSON.parse(localStorage.getItem("myProjectsLocalStorageArray"));
    if (storedData) {
        
        storedData.forEach(project => {
            let newProject = new Project(project.title, project.todos, project.uniqueId);
          
            newProject.currentProjectIdentifier();
            newProject.pushProjectToArray();
           
            
            project.todos.forEach(todo => {
                let newTodo = new Todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.completed, todo.uniqueId);
                newTodo.pushTodoToArray();
            });


            saveToLocalStorage();
        });
    }
  
    return storedData;
}



//utility functions 
function createNewProject(textInputProjectTitle) {
    
    let newProject = new Project(textInputProjectTitle.value);
      newProject.pushProjectToArray();
      console.log(myProjects);
      saveToLocalStorage();
      
};


function onTodoDialogSaveButtonClick() {
    let textInputTodoTitleValue = document.querySelector("#text-input-todo-title").value;
    let textInputTodoDescriptionValue = document.querySelector("#text-input-todo-description").value;
    let textInputTodoDueDateValue = document.querySelector("#text-input-todo-due-date").value;
    let textInputTodoPriorityValue = document.querySelector("#todo-priority").value;

    let newTodo = new Todo(textInputTodoTitleValue,textInputTodoDescriptionValue,textInputTodoDueDateValue,textInputTodoPriorityValue);

    newTodo.pushTodoToArray();
}



function ifCurrentProjectIndexForOperationIsUndefined(currentProjectIndexForOperation) {
   if (currentProjectIndexForOperation == undefined) {
     
     return 0;
  }};


function editCurrentTodo(currentProjectIndexForOperation,currentTodoIndex,titleValue,dueDateValue) {
     
    myProjects[currentProjectIndexForOperation].todos[currentTodoIndex].editTodo(titleValue,dueDateValue,false);
}

function getCurrentTodoIndex(currentProjectIndex,clickedTodoDatasetIndexNumber,event) {

            currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo !== undefined && todo.uniqueId == clickedTodoDatasetIndexNumber);
            return currentTodoIndex;
};


function addProjectLabelToDom() {
    let projectLabel = document.createElement("p");
  projectLabel.setAttribute("id", "project-label");
  projectLabel.textContent = "Projects";
  projectDiv.appendChild(projectLabel);
};



function getCurrentProjectIndexForOperation(uniqueIdOfProject,currentProjectIndexForOperation) {
    currentProjectIndexForOperation = myProjects.findIndex(project => project !== undefined && project!== null && project.uniqueId == uniqueIdOfProject);
    console.log(currentProjectIndexForOperation);
    currentProjectIndexForOperation = myProjects[currentProjectIndexForOperation].currentProjectIdentifier();
    return currentProjectIndexForOperation;
};

function getCurrentProjectTodos(currentProjectIndex) {
    return myProjects[currentProjectIndex].todos;
};



function markCurrentTodoAsIncomplete(event,currentProjectIndex,currentTodoIndex) {
    let clickedTodoDatasetIndexNumber = event.target.parentElement.parentElement.getAttribute('data-index');
    currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo !== undefined && todo.uniqueId == clickedTodoDatasetIndexNumber);
    myProjects[currentProjectIndex].todos[currentTodoIndex].markTodoAsIncomplete();
    console.log(myProjects);
};


function markCurrentTodoAsComplete(event,currentProjectIndex,currentTodoIndex){
    let clickedTodoDatasetIndexNumber = event.target.parentElement.parentElement.getAttribute('data-index');
        
        currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo !== undefined && todo.uniqueId == clickedTodoDatasetIndexNumber);

        myProjects[currentProjectIndex].todos[currentTodoIndex].markTodoAsComplete();
        console.log(myProjects);
};




function deleteATodo(currentTodoDataIndex) {

            let currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo !== undefined && todo.uniqueId == currentTodoDataIndex);
    

            delete myProjects[currentProjectIndex].todos[currentTodoIndex];
            console.log(myProjects);
};


function removeProjectFromArray(uniqueIdOfButtonDiv) {
    let indexToDelete = myProjects.findIndex(project => project !== undefined && project.uniqueId == uniqueIdOfButtonDiv);
  
    delete myProjects[indexToDelete]
    console.log(myProjects);
    saveToLocalStorage();
  }


let retrievedStoredProjects = retrieveFromLocalStorage();
if(!retrievedStoredProjects.some(project => project.title == "Default project")) {


    
// INITIALIZATION OF THE APP
// This is to initialize the default project
let defaultProject = new Project("Default Project");
defaultProject.pushProjectToArray();



// Creating initial todos for the default project

const todo1 = new Todo(
    "Create a Simple Web Page",
    "Build a webpage with a header, paragraph, image, and a styled button.",
    "2024-12-11",
    "High",
    false
);

const todo2 = new Todo(
    "Learn CSS Flexbox",
    "Practice aligning elements using Flexbox properties like `justify-content` and `align-items`.",
    "2024-12-12",
    "Medium",
    false
);

const todo3 = new Todo(
    "Add Interactivity with JavaScript",
    "Create a webpage where clicking a button changes the background color.",
    "2024-12-13",
    "High",
    false
);

const todo4 = new Todo(
    "Build a Responsive Navigation Bar",
    "Design a mobile-friendly navigation bar with a dropdown menu using HTML, CSS, and media queries.",
    "2024-12-15",
    "High",
    false
);


defaultProject.currentProjectIdentifier();
// Add new todos to the default project (index 0)
todo1.pushTodoToArray();
todo2.pushTodoToArray();
todo3.pushTodoToArray();
todo4.pushTodoToArray();
saveToLocalStorage();
}



// View all projects and display them
console.log(Project.viewAllProjects());


// Display projects
document.addEventListener("DOMContentLoaded", () => {
    displayProjects(projectDiv);
    displayElementsInContent(0);
   
});

 

export { Project, myProjects, projectDiv,onTodoDialogSaveButtonClick ,saveToLocalStorage,retrieveFromLocalStorage,ifCurrentProjectIndexForOperationIsUndefined,editCurrentTodo,addProjectLabelToDom,getCurrentProjectIndexForOperation,getCurrentProjectTodos,markCurrentTodoAsIncomplete,markCurrentTodoAsComplete,getCurrentTodoIndex,deleteATodo,removeProjectFromArray,createNewProject,currentTodoIndex};