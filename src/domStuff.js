import "./styles.css";
import { Project,projects } from "./index.js";

const addProjectButton = document.querySelector("#add-project-button");
const addProjectForm = document.querySelector("#project-form");
const projectSaveButton = document.querySelector("#project-save-button");
const projectNameInput = document.querySelector("#project-name-input");
const cancelProjectButton = document.querySelector("#project-cancel-button");
const projectsContainer = document.querySelector("#projects-container");

function onAddProjectButtonClickDOM(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    addProjectForm.style.visibility = "visible";
  
}

function onProjectSaveButtonClickDOM() {
    let title = projectNameInput.value;
    let newProjectDiv = document.createElement("div");
    newProjectDiv.classList.add("new-project-div");
    newProjectDiv.textContent = title;

    let projectDeleteButton = document.createElement("button");
    
    projectDeleteButton.classList.add("project-del-button"); // Add class
    projectDeleteButton.textContent = "X";

    
    
    projectsContainer.appendChild(newProjectDiv);
    addProjectForm.style.visibility = "hidden";
    projectNameInput.value = ""; // Clear the input field
    newProjectDiv.setAttribute("data-index-number",projects.length);


    newProjectDiv.appendChild(projectDeleteButton);
    let newProject = new Project(title);
    newProject.pushProject();
    console.log(projects);
    
}

function onProjectCancelButtonClickDOM() {
    addProjectForm.style.visibility = "hidden";
    projectNameInput.value = ""; // Clear the input field
}

export {
    cancelProjectButton,
    addProjectButton,
    addProjectForm,
    projectSaveButton,
    projectNameInput,
    onProjectSaveButtonClickDOM,
    onAddProjectButtonClickDOM,
    onProjectCancelButtonClickDOM,
    projectsContainer,
   
};
