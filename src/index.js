import "./styles.css";

const myProjects = [{
    title : "Default Project",
    todos : [],
}];

class Todo {
    constructor(title,description,dueDate,priority,completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    };
};

class Project {
    constructor(title,todos = []) {
        this.title = title;
        this.todos = todos;
    };
};
