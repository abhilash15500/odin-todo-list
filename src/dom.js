import { Project,myProjects,projectDiv} from "./index.js";

import deleteIcon from './images/delete-svg.svg';


const projectAddDialog = document.querySelector("#project-add-dialog");

const addProjectButton = document.querySelector("#add-project-div");
const projectAddCancelButton = document.querySelector("#project-add-cancel-button");
const projectAddSaveButton = document.querySelector("#project-add-save-button");
const textInputProjectTitle = document.querySelector("#text-input-project-title");

function displayProjects(projectDiv) {
  projectDiv.innerHTML = "";
  let listOfProjects = Project.viewAllProjects();
  let projectLabel = document.createElement("p");
  projectLabel.setAttribute("id", "project-label");
  projectLabel.textContent = "Projects";
  projectDiv.appendChild(projectLabel);

  listOfProjects.forEach(project => {
    let projectInstances = document.createElement("div");
    projectInstances.classList.add("sidebar-elements", "project-instances");
    projectInstances.setAttribute('data-index', project.uniqueId);

    let projectIconTextDiv = document.createElement("div");
    projectIconTextDiv.classList.add("project-icon-text-div");

    let orangeCircle = document.createElement("div");
    orangeCircle.classList.add("orange-circle");

    let projectInstanceText = document.createElement("p");
    projectInstanceText.classList.add("project-instance-text");
    projectInstanceText.textContent = project.title;

    let projectDeleteButton = document.createElement("img");
    projectDeleteButton.classList.add("project-delete-button");
    projectDeleteButton.src = deleteIcon;

    projectDiv.appendChild(projectInstances);
    projectInstances.appendChild(projectIconTextDiv);
    projectIconTextDiv.append(orangeCircle, projectInstanceText); 
    projectInstances.appendChild(projectDeleteButton);
  });

 
  const projectDeleteButtons = document.querySelectorAll(".project-delete-button");
  projectDeleteButtons.forEach(button => {
    button.addEventListener("click", () => {
      removeProjectDiv(button);

      

    });
  });
};



function removeProjectDiv(button) {
  button.parentElement.remove();

}

function closeProjectAddDialog() {
  projectAddDialog.close();
};


function showProjectAddDialog() {
  projectAddDialog.showModal();
};





addProjectButton.addEventListener("click",()=>{
  showProjectAddDialog();
});


projectAddCancelButton.addEventListener("click",()=>{
  closeProjectAddDialog();
});

projectAddSaveButton.addEventListener("click",()=>{
  
  
  
 let newProject = new Project(textInputProjectTitle.value);
  newProject.pushProjectToArray();
 closeProjectAddDialog();

 
 
 
 console.log(myProjects);
 
 displayProjects(projectDiv);
});










export {displayProjects};