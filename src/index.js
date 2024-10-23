import "./styles.css";

const myProjects = [];

let currentProjectIndex;

class Todo {
    constructor(title, description, dueDate, priority, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    };

    markTodoAsComplete() {
        this.completed = true;
    };

    changeTodoPriority() {
        this.priority = priority;
    };

    pushTodoToArray() {
        if (currentProjectIndex == undefined) {
            myProjects[0].todo.push(this);
        }

        else if (currentProjectIndex) {
            myProjects[currentProjectIndex].todos.push(this);
        };
    };
};


class Project {
    constructor(title, todos = [],uniqueId) {
        this.title = title;
        this.todos = todos;
        this.uniqueId = Math.floor(Math.random() * 10000);
    };

    pushProjectToArray() {
        myProjects.push(this);

    };

    currentProjectIdentifier() {
        let uniqueIdOfProject = this.uniqueId
        const currentProjectIndex = myProjects.findIndex(project => project.uniqueId == uniqueIdOfProject);
        console.log(currentProjectIndex);
    };
};


let defaultProject = new Project("Default Project");
defaultProject.pushProjectToArray();



let anotherNewProject = new Project("idk");
anotherNewProject.pushProjectToArray();
anotherNewProject.currentProjectIdentifier();
defaultProject.currentProjectIdentifier();
console.log(myProjects);

