import "./styles.css";
import { displayProjects,displayElementsInContent } from "./dom.js";


const projectDiv = document.querySelector("#project-div");

const myProjects = [];   // array to store all the projects

let currentProjectIndex;
let currentTodoIndex;

// constructors for todos and projects
class Todo {
    constructor(title, description, dueDate, priority, completed = false,uniqueId) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.uniqueId =  Math.floor(Math.random() * 10000);
    };

    markTodoAsComplete() {
        this.completed = true;
    };

    changeTodoPriority() {
        this.priority = priority;
    };

    pushTodoToArray() {
        if (currentProjectIndex === undefined || currentProjectIndex === -1) {
            myProjects[0].todos.push(this);  // Push to the first project, i.e., defaultProject
        } else {
            myProjects[currentProjectIndex].todos.push(this);  // Push to the selected project
        }


       
    };

    viewTodo() {
        console.log(this);
    };

    editTodo(newTitle,newDueDate,newPriority) {
        this.title = newTitle;
        this.dueDate = newDueDate;
        this.priority = newPriority; 
    };


    deleteTodo() {
        let uniqueIdOfTodo = this.uniqueId;
        currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo.uniqueId == uniqueIdOfTodo);
        delete myProjects[currentProjectIndex].todos[currentTodoIndex];
    }
};

class Project {
    constructor(title, todos = [], uniqueId) {
        this.title = title;
        this.todos = todos;
        this.uniqueId = Math.floor(Math.random() * 10000);
    };

    pushProjectToArray() {
        myProjects.push(this);

    };

    currentProjectIdentifier() {
        let uniqueIdOfProject = this.uniqueId
        currentProjectIndex = myProjects.findIndex(project => project.uniqueId == uniqueIdOfProject);
        console.log(currentProjectIndex);
        return currentProjectIndex;
    };

    

    deleteProject() {
        let uniqueIdOfProject = this.uniqueId;
        let currentProjectIndexToDelete = myProjects.findIndex(project => project.uniqueId == uniqueIdOfProject);
        delete myProjects[currentProjectIndexToDelete];

    };


    viewTodos() {
        return this.todos.map(todo => {
            return { title: todo.title, dueDate: todo.dueDate };
        });
    };
    


    static viewAllProjects() {
        return myProjects.map(project => ({
            title: project.title,
            uniqueId: project.uniqueId
        }));
    };
    
};




//INITIALIATION OF THE APP!!!!!!!!!!!!!! HEHE
// This is to initialize the default project
let defaultProject = new Project("Default Project");
defaultProject.pushProjectToArray();

// Testing console version
let anotherNewProject = new Project("idk");
anotherNewProject.pushProjectToArray();
anotherNewProject.currentProjectIdentifier();

// Creating initial todos for the default project
const todo1 = new Todo("Finish Homework", "Complete the math homework", "2024-10-30", "High", false);
const todo2 = new Todo("Grocery Shopping", "Buy fruits and vegetables", "2024-11-01", "Medium", false);
const todo3 = new Todo("Learn Webpack", "Study asset bundling and loaders", "2024-11-15", "High", false);

// Add todos to the default project (index 0)
todo1.pushTodoToArray();
todo2.pushTodoToArray();
todo3.pushTodoToArray();

// Adding more todos
const todo4 = new Todo("Read JavaScript Book", "Complete the chapter on ES6 features", "2024-12-01", "Medium", false);
const todo5 = new Todo("Prepare for Interview", "Review algorithms and data structures", "2024-11-20", "High", false);
const todo6 = new Todo("Clean the House", "Organize the living room and kitchen", "2024-11-05", "Low", false);
const todo7 = new Todo("Complete Web Project", "Finish the portfolio website", "2024-11-10", "High", false);


defaultProject.currentProjectIdentifier();
// Add new todos to the default project (index 0)
todo4.pushTodoToArray();
todo5.pushTodoToArray();
todo6.pushTodoToArray();
todo7.pushTodoToArray();

// View all projects and display them
console.log(Project.viewAllProjects());


//display projects
document.addEventListener("DOMContentLoaded", () => {
    console.log(Project.viewAllProjects());
    displayProjects(projectDiv);
    displayElementsInContent(0);
});


export { Project, myProjects, projectDiv };