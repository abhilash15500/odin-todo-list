import "./styles.css";

const projects = [{
    title: "default project",
    todos: [],
}];

let currentProject = projects[0].todos;

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    pushTodo() {
        currentProject.push(this);
    };

    



}

class Project {
    constructor(title, todos = []) {
        this.title = title;
        this.todos = todos;
    }

    pushProject() {
        projects.push(this);
        currentProject = this.todos;
    }
}



let p1 = new Project("I'm new");
p1.pushProject();

let t1 = new Todo('title', 'description', 'dueDate', 'priority');
t1.pushTodo();

console.log(projects);
