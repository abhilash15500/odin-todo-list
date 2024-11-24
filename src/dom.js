import { Project, myProjects, projectDiv } from "./index.js";

import deleteIcon from './images/delete-svg.svg';
import calendarIcon from './images/calender.svg';
import editIcon from './images/edit-svg.svg';



const projectAddDialog = document.querySelector("#project-add-dialog");

const addProjectButton = document.querySelector("#add-project-div");
const projectAddCancelButton = document.querySelector("#project-add-cancel-button");
const projectAddSaveButton = document.querySelector("#project-add-save-button");
const textInputProjectTitle = document.querySelector("#text-input-project-title");
const currentProjectHeading = document.querySelector("#current-project-heading");

const content = document.querySelector("#content");
const todosContainerHolder = document.querySelector("#todos-container-holder");



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

    // Add click event listener to each project instance
    projectInstances.addEventListener("click", (event) => {
        
         let uniqueIdOfProject =  event.target.getAttribute("data-index");
         console.log(uniqueIdOfProject);
         
          
        let  currentProjectIndex = myProjects.findIndex(project => project.uniqueId == uniqueIdOfProject)

      console.log(currentProjectIndex);
      
      //
      displayElementsInContent(currentProjectIndex);


      //

      


    });
  });


  // project dele buttons event listener

  const projectDeleteButtons = document.querySelectorAll(".project-delete-button");
  projectDeleteButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      removeProjectDiv(button);

      let uniqueIdOfButtonDiv = button.parentElement.getAttribute("data-index");
      removeProjectFromArray(uniqueIdOfButtonDiv);
    });
  });
}






function displayElementsInContent(currentProjectIndex) {
todosContainerHolder.innerHTML  = "";
    currentProjectHeading.textContent = myProjects[currentProjectIndex].title;

    let currentProjectTodos = myProjects[currentProjectIndex].todos;

  currentProjectTodos.forEach(todo => {

    if(todo.completed == true) {
      let orangeFilledCircleDiv = document.createElement("div");
      orangeFilledCircleDiv.classList.add("todo-checkboxes","todo-checkboxes-filled");

      let finishedTodoParagraph = document.createElement("p");
      finishedTodoParagraph.classList.add("finished-todo");


      let dateImage = document.createElement("img");
      dateImage.classList.add("due-date-icon");
     dateImage.src = calendarIcon;


      let dueDateParagraph = document.createElement("p");
      dueDateParagraph.classList.add("due-date-text","due-date-text-striked");


      let editImage = document.createElement("img");
      editImage.classList.add("todo-buttons");
      editImage.src = editIcon;

      let deleteImage = document.createElement("img");
      deleteImage.classList.add("todo-buttons");
      deleteImage.src  = deleteIcon;


      let todoCheckBoxTitleDiv = document.createElement("div");
      todoCheckBoxTitleDiv.classList.add("todo-checkbox-title-div");


      let dueDateDiv = document.createElement("div");
      dueDateDiv.classList.add("due-date-div");

      let todoButtonsDiv  = document.createElement("div");
      todoButtonsDiv.classList.add("todo-buttons-div");

      
      let todosContainer = document.createElement("div");
      todosContainer.classList.add("todos-container","content-elements");
      todosContainer.dataset.index = todo.uniqueId;


      todosContainerHolder.append(todosContainer);

      todosContainer.append(todoCheckBoxTitleDiv,dueDateDiv,todoButtonsDiv);

      todoCheckBoxTitleDiv.append(orangeFilledCircleDiv,finishedTodoParagraph);

      dueDateDiv.append(dateImage,dueDateParagraph);

      todoButtonsDiv.append(editImage,deleteIcon);




    }

    else if(todo.completed == false) {
      let orangeUnfilledCircleDiv = document.createElement("div");
      orangeUnfilledCircleDiv.classList.add("todo-checkboxes");

      let todoParagraph = document.createElement("p");
      todoParagraph.textContent = todo.title;
      


      let dateImage = document.createElement("img");
      dateImage.classList.add("due-date-icon");
      dateImage.src = calendarIcon;

      let dueDateParagraph = document.createElement("p");
      dueDateParagraph.classList.add("due-date-text","due-date-text-striked");
      dueDateParagraph.textContent = todo.dueDate;

      let editImage = document.createElement("img");
      editImage.classList.add("todo-buttons");
      editImage.src = editIcon;


      let deleteImage = document.createElement("img");
      deleteImage.classList.add("todo-buttons");
      deleteImage.src = deleteIcon;



      
      let todoCheckBoxTitleDiv = document.createElement("div");
      todoCheckBoxTitleDiv.classList.add("todo-checkbox-title-div");


      let dueDateDiv = document.createElement("div");
      dueDateDiv.classList.add("due-date-div");

      let todoButtonsDiv  = document.createElement("div");
      todoButtonsDiv.classList.add("todo-buttons-div");

      
      let todosContainer = document.createElement("div");
      todosContainer.classList.add("todos-container","content-elements");
      todosContainer.dataset.index = todo.uniqueId;


      todosContainerHolder.append(todosContainer);

      todosContainer.append(todoCheckBoxTitleDiv,dueDateDiv,todoButtonsDiv);

      todoCheckBoxTitleDiv.append(orangeUnfilledCircleDiv,todoParagraph);

      dueDateDiv.append(dateImage,dueDateParagraph);

      todoButtonsDiv.append(editImage,deleteImage);



    }
      
    });
    
    

}


function findIndexOfElement(element) {
  let targetIndex=0;
  myProjects.forEach(project => {
      if(project.uniqueId == element) {
        return targetIndex;
        console.log(targetIndex);
      }

      else {
        targetIndex = targetIndex+1;
      };

    
  });
  
};  


function updateCurrentProjectHeading(currentProjectHeading, projectInstanceText) {
  currentProjectHeading.textContent = projectInstanceText.textContent;
}

function removeProjectFromArray(uniqueIdOfButtonDiv) {

  let indexToDelete = myProjects.findIndex(project => project.uniqueId == uniqueIdOfButtonDiv);

  myProjects[indexToDelete].deleteProject();
  console.log(myProjects);

};

function removeProjectDiv(button) {
  button.parentElement.remove();

};

function closeProjectAddDialog() {
  projectAddDialog.close();
};


function showProjectAddDialog() {
  projectAddDialog.showModal();
};





addProjectButton.addEventListener("click", () => {
  showProjectAddDialog();
});


projectAddCancelButton.addEventListener("click", () => {
  closeProjectAddDialog();
});

projectAddSaveButton.addEventListener("click", () => {



  let newProject = new Project(textInputProjectTitle.value);
  newProject.pushProjectToArray();
  closeProjectAddDialog();




  console.log(myProjects);

  displayProjects(projectDiv);
});








export { displayProjects };





