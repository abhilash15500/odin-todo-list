import { Project} from "./index.js";
export {displayProjects};
import deleteIcon from './images/delete-svg.svg';

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
}
