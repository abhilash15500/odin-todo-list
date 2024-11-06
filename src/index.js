import "./styles.css";
import { displayProjects } from "./dom.js";


const projectDiv = document.querySelector("#project-div");



const myProjects = [];

let currentProjectIndex;
let currentTodoIndex;

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
        if (currentProjectIndex == undefined) {
            myProjects[0].todos.push(this);
        }

        else if (currentProjectIndex) {
            myProjects[currentProjectIndex].todos.push(this);
        };


       
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
    };


    deleteProject() {
        let uniqueIdOfProject = this.uniqueId;
        let currentProjectIndexToDelete = myProjects.findIndex(project => project.uniqueId == uniqueIdOfProject);
        delete myProjects[currentProjectIndexToDelete];

    };

    viewTodos() {
        this.todos.forEach(todo => {
            console.log(`Title - ${todo.title} , DueDate - ${todo.dueDate} and Priority is ${todo.priority}`);
        });
    };



    static viewAllProjects() {
        return myProjects.map(project => ({
            title: project.title,
            uniqueId: project.uniqueId
        }));
    };
    
};



// this is to initialize default project
let defaultProject = new Project("Default Project");
defaultProject.pushProjectToArray();

// testing console version
let anotherNewProject = new Project("idk");
anotherNewProject.pushProjectToArray();
anotherNewProject.currentProjectIdentifier();

const todo1 = new Todo("Finish Homework","Complete the math homework","2024-10-30","High",false);
const todo2 = new Todo("h","dsa","Ds","h",false)
todo1.pushTodoToArray();
todo2.pushTodoToArray();


todo1.editTodo("new title","10-20-303","low");
// console.log(myProjects);


console.log(Project.viewAllProjects());


displayProjects(projectDiv);





export {Project,myProjects,projectDiv}