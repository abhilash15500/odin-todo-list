import "./styles.css";

import {
    addProjectButton,
    addProjectForm,
    projectSaveButton,
    projectNameInput,
    onProjectSaveButtonClickDOM,
    onAddProjectButtonClickDOM,
    onProjectCancelButtonClickDOM,
    cancelProjectButton,
    projectsContainer
} from "./domStuff.js";

const projects = [{
    title: "Untitled Project",
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
    constructor(title, todos = [],indexNumber) {
        this.title = title;
        this.todos = todos;
        
    }

    pushProject() {
        projects.push(this);
        currentProject = this.todos;
    };
}




// Load existing projects when the window loads
window.addEventListener("load", () => {
    projects.forEach(project => {
        const projectElement = document.createElement("div"); // Create a new div element
        projectElement.classList.add("new-project-div");
        projectElement.textContent = project.title; // Set the title as text content
        projectsContainer.appendChild(projectElement); // Append it to the container
    });
});

// Event listeners
addProjectButton.addEventListener("click", (event) => {
    onAddProjectButtonClickDOM(event); // Pass the event object correctly
    
});

projectSaveButton.addEventListener("click", () => {
    onProjectSaveButtonClickDOM();
});

cancelProjectButton.addEventListener("click", () => {
    onProjectCancelButtonClickDOM();
});



export {
    Project,projects
}