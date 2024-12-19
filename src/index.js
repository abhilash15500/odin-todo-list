import "./styles.css";
import { displayProjects, displayElementsInContent } from "./dom.js";

const projectDiv = document.querySelector("#project-div");
const myProjects = []; // Array to store all the projects

let currentProjectIndex;
let currentTodoIndex;

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
    }


    markTodoAsIncomplete() {
        this.completed = false;
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
        return myProjects.map((project) => ({
            title: project.title,
            uniqueId: project.uniqueId,
        }));
    }
}


function saveToLocalStorage() {
        localStorage.setItem("myProjectsLocalStorageArray",JSON.stringify(myProjects));
};

function retrieveFromLocalStorage() {
    JSON.parse(localStorage.getItem("myProjectsLocalStorageArray"));
};







function onTodoDialogSaveButtonClick() {
    let textInputTodoTitleValue = document.querySelector("#text-input-todo-title").value;
    let textInputTodoDescriptionValue = document.querySelector("#text-input-todo-description").value;
    let textInputTodoDueDateValue = document.querySelector("#text-input-todo-due-date").value;
    let textInputTodoPriorityValue = document.querySelector("#todo-priority").value;

    let newTodo = new Todo(textInputTodoTitleValue,textInputTodoDescriptionValue,textInputTodoDueDateValue,textInputTodoPriorityValue);

    newTodo.pushTodoToArray();
}




// INITIALIZATION OF THE APP
// This is to initialize the default project
let defaultProject = new Project("Default Project");
defaultProject.pushProjectToArray();

// Testing console version

// Creating initial todos for the default project

const todo4 = new Todo(
    "Create a Simple Web Page",
    "Build a webpage with a header, paragraph, image, and a styled button.",
    "2024-12-11",
    "High",
    false
);

const todo5 = new Todo(
    "Learn CSS Flexbox",
    "Practice aligning elements using Flexbox properties like `justify-content` and `align-items`.",
    "2024-12-12",
    "Medium",
    false
);

const todo6 = new Todo(
    "Add Interactivity with JavaScript",
    "Create a webpage where clicking a button changes the background color.",
    "2024-12-13",
    "High",
    false
);

const todo7 = new Todo(
    "Build a Responsive Navigation Bar",
    "Design a mobile-friendly navigation bar with a dropdown menu using HTML, CSS, and media queries.",
    "2024-12-15",
    "High",
    false
);


defaultProject.currentProjectIdentifier();
// Add new todos to the default project (index 0)
todo4.pushTodoToArray();
todo5.pushTodoToArray();
todo6.pushTodoToArray();
todo7.pushTodoToArray();

// View all projects and display them
console.log(Project.viewAllProjects());


// Display projects
document.addEventListener("DOMContentLoaded", () => {
    console.log(Project.viewAllProjects());
    displayProjects(projectDiv);
    displayElementsInContent(0);
   
});


retrieveFromLocalStorage();



export { Project, myProjects, projectDiv,onTodoDialogSaveButtonClick ,saveToLocalStorage,retrieveFromLocalStorage};
