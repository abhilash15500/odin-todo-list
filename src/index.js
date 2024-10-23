import "./styles.css";
import { greeting } from "./greeting.js";


const myProjects = [{title:"Default Project",todos : []}];


class Todo {
    constructor(title,description,dueDate,priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }


}


class Project {
    constructor(title) {
        this.title = title;
    }
    
}