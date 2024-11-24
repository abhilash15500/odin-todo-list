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



// this is to initialize default project
let defaultProject = new Project("Default Project");

defaultProject.pushProjectToArray();

// testing console version
let anotherNewProject = new Project("idk");
anotherNewProject.pushProjectToArray();
anotherNewProject.currentProjectIdentifier();

const todo1 = new Todo("Finish Homework", "Complete the math homework", "2024-10-30", "High", false);
const todo2 = new Todo("Grocery Shopping", "Buy fruits and vegetables", "2024-11-01", "Medium", false);
const todo3 = new Todo("Learn Webpack", "Study asset bundling and loaders", "2024-11-15", "High", false);

todo1.pushTodoToArray();
todo2.pushTodoToArray();
todo3.pushTodoToArray();




console.log(Project.viewAllProjects());


displayProjects(projectDiv);





export {Project,myProjects,projectDiv}