import { Project, myProjects, onTodoDialogSaveButtonClick, projectDiv, saveToLocalStorage, retrieveFromLocalStorage, ifCurrentProjectIndexForOperationIsUndefined, editCurrentTodo, addProjectLabelToDom, getCurrentProjectIndexForOperation ,getCurrentProjectTodos,markCurrentTodoAsIncomplete,markCurrentTodoAsComplete,getCurrentTodoIndex,currentTodoDataIndex, deleteATodo,removeProjectFromArray,createNewProject,currentTodoIndex} from "./index.js";
import deleteIcon from './images/delete-svg.svg';
import calendarIcon from './images/calender.svg';
import editIcon from './images/edit-svg.svg';

import { helperFunction } from "./helperFunctions.js";
import { unique } from "webpack-merge";



const addProjectButton = document.querySelector("#add-project-div");
const projectAddCancelButton = document.querySelector("#project-add-cancel-button");
const projectAddSaveButton = document.querySelector("#project-add-save-button");
const textInputProjectTitle = document.querySelector("#text-input-project-title");
const currentProjectHeading = document.querySelector("#current-project-heading");
const content = document.querySelector("#content");
const todosContainerHolder = document.querySelector("#todos-container-holder");
const todosCheckboxes = document.querySelectorAll(".todo-checkboxes");
const addTodoButton = document.querySelector(".add-todos-button");
const todoAddDialog = document.querySelector("#todo-add-dialog");
const todoAddDialogCancelButton = document.querySelector("#todo-add-cancel-button");
const todoAddDialogSaveButton = document.querySelector("#todo-add-save-button");
const todoEditDialog = document.querySelector("#todo-edit-dialog");
let currentProjectIndexForOperation;
let todoEditSaveButton = document.querySelector("#todo-edit-save-button");
let todoEditCancelButton = document.querySelector("#todo-edit-cancel-button");
let textEditInputTodoTitle = document.querySelector("#text-edit-input-todo-title");
let textEditInputTodoDueDate = document.querySelector("#text-edit-input-todo-due-date");






addTodoButton.addEventListener("click", () => {
  todoAddDialog.showModal();
});


todoAddDialogCancelButton.addEventListener("click", () => {
  todoAddDialog.close();
});


todoAddDialogSaveButton.addEventListener("click", () => {
  onTodoDialogSaveButtonClick();
  todoAddDialog.close();
  ifCurrentProjectIndexForOperationIsUndefined(currentProjectIndexForOperation);
  saveToLocalStorage();
  displayElementsInContent(currentProjectIndexForOperation);
});



todoEditSaveButton.addEventListener("click", () => {

  todoEditDialog.close();

  if (currentProjectIndexForOperation == undefined) {
    currentProjectIndexForOperation = 0;
  };

  let titleValue = textEditInputTodoTitle.value;
  let dueDateValue = textEditInputTodoDueDate.value;

  
  editCurrentTodo(currentProjectIndexForOperation, currentTodoIndex, titleValue, dueDateValue);
  saveToLocalStorage();
  displayElementsInContent(currentProjectIndexForOperation);
});




todoEditCancelButton.addEventListener("click", () => {
  todoEditDialog.close();
});



function displayProjects(projectDiv) {
  projectDiv.innerHTML = "";

  let listOfProjects = Project.viewAllProjects();    //get list of projects

  addProjectLabelToDom();

  listOfProjects.forEach(project => {
    // let projectInstances = helperFunction('div',['sidebar-elements','project-instances'],'',{ 'data-index': project.uniqueId });
 

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
      addTodoButton.style.display = "block";
      let uniqueIdOfProject = event.currentTarget.getAttribute("data-index");

      currentProjectIndexForOperation = getCurrentProjectIndexForOperation(uniqueIdOfProject,currentProjectIndexForOperation);

      displayElementsInContent(currentProjectIndexForOperation);
    });
  });

  // Project delete buttons event listener
  const projectDeleteButtons = document.querySelectorAll(".project-delete-button");
  projectDeleteButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      removeProjectDiv(button);
      let uniqueIdOfButtonDiv = button.parentElement.getAttribute("data-index");
      removeProjectFromArray(uniqueIdOfButtonDiv);
      emptyDivFillerDom();
    });
  });
};



function emptyDivFillerDom() {
  currentProjectHeading.textContent = "WOW , SUCH EMPTYYYYYYYYYYY?";
  todosContainerHolder.innerHTML = "";
  addTodoButton.style.display = "none";
};


function displayElementsInContent(currentProjectIndex) {
  todosContainerHolder.innerHTML = "";
  currentProjectHeading.textContent = myProjects[currentProjectIndex].title;
  let currentProjectTodos = getCurrentProjectTodos(currentProjectIndex);
  
  currentProjectTodos.forEach(todo => {
    if (todo.completed == true) {
      let orangeFilledCircleDiv = document.createElement("div");
      orangeFilledCircleDiv.classList.add("todo-checkboxes", "todo-checkboxes-filled");
      orangeFilledCircleDiv.addEventListener("click", (event) => {
        
        markCurrentTodoAsIncomplete(event,currentProjectIndex,currentTodoIndex);

        displayElementsInContent(currentProjectIndex);
      });



      let finishedTodoParagraph = document.createElement("p");
      finishedTodoParagraph.classList.add("finished-todo");
      finishedTodoParagraph.textContent = todo.title;

      let dateImage = document.createElement("img");
      dateImage.classList.add("due-date-icon");
      dateImage.src = calendarIcon;

      let dueDateParagraph = document.createElement("p");
      dueDateParagraph.classList.add("due-date-text", "due-date-text-striked");
      dueDateParagraph.textContent = todo.dueDate;

      let editImage = document.createElement("img");
      editImage.classList.add("todo-buttons");
      editImage.src = editIcon;


      editImage.addEventListener("click", (event) => {

        let clickedTodoDatasetIndexNumber = event.target.parentElement.parentElement.getAttribute('data-index');

        getCurrentTodoIndex(currentProjectIndex,clickedTodoDatasetIndexNumber,event);

        console.log(`${currentProjectIndex} is curr pro index and ${currentTodoIndex}`);

        showValuesOnEditForm(event);

        todoEditDialog.showModal();

      });


      let deleteImage = document.createElement("img");
      deleteImage.classList.add("todo-buttons");
      deleteImage.src = deleteIcon;

      deleteImage.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.remove();  // for dom

        // for logic
        let currentTodoDataIndex = event.target.parentElement.parentElement.getAttribute('data-index');

        deleteATodo(currentTodoDataIndex);
        saveToLocalStorage();

      });



      let todoCheckBoxTitleDiv = document.createElement("div");
      todoCheckBoxTitleDiv.classList.add("todo-checkbox-title-div");

      let dueDateDiv = document.createElement("div");
      dueDateDiv.classList.add("due-date-div");

      let todoButtonsDiv = document.createElement("div");
      todoButtonsDiv.classList.add("todo-buttons-div");

      let todosContainer = document.createElement("div");
      todosContainer.classList.add("todos-container", "content-elements");
      todosContainer.dataset.index = todo.uniqueId;

      todosContainerHolder.append(todosContainer);

      todosContainer.append(todoCheckBoxTitleDiv, dueDateDiv, todoButtonsDiv);

      todoCheckBoxTitleDiv.append(orangeFilledCircleDiv, finishedTodoParagraph);
      dueDateDiv.append(dateImage, dueDateParagraph);
      todoButtonsDiv.append(editImage, deleteImage);

    } else if (todo.completed == false) {
      let orangeUnfilledCircleDiv = document.createElement("div");
      orangeUnfilledCircleDiv.classList.add("todo-checkboxes");

      orangeUnfilledCircleDiv.addEventListener("click", (event) => {
     
        markCurrentTodoAsComplete(event,currentProjectIndex,currentTodoIndex);

        displayElementsInContent(currentProjectIndex);
      });

      let todoParagraph = document.createElement("p");
      todoParagraph.textContent = todo.title;

      let dateImage = document.createElement("img");
      dateImage.classList.add("due-date-icon");
      dateImage.src = calendarIcon;

      let dueDateParagraph = document.createElement("p");
      dueDateParagraph.classList.add("due-date-text");
      dueDateParagraph.textContent = todo.dueDate;

      let editImage = document.createElement("img");
      editImage.classList.add("todo-buttons");
      editImage.src = editIcon;

      editImage.addEventListener("click", (event) => {

        let clickedTodoDatasetIndexNumber = event.target.parentElement.parentElement.getAttribute('data-index');
        getCurrentTodoIndex(currentProjectIndex,clickedTodoDatasetIndexNumber,event);
        console.log(`${currentProjectIndex} is curr pro index and ${currentTodoIndex}`);
        showValuesOnEditForm(event);
        todoEditDialog.showModal();
      });


      let deleteImage = document.createElement("img");
      deleteImage.classList.add("todo-buttons");
      deleteImage.src = deleteIcon;

      deleteImage.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.remove();  //dom

        //logic 
        let currentTodoDataIndex = event.target.parentElement.parentElement.getAttribute('data-index');
        deleteATodo(currentTodoDataIndex);
        saveToLocalStorage();
      });
      

      let todoCheckBoxTitleDiv = document.createElement("div");
      todoCheckBoxTitleDiv.classList.add("todo-checkbox-title-div");

      let dueDateDiv = document.createElement("div");
      dueDateDiv.classList.add("due-date-div");

      let todoButtonsDiv = document.createElement("div");
      todoButtonsDiv.classList.add("todo-buttons-div");

      let todosContainer = document.createElement("div");
      todosContainer.classList.add("todos-container", "content-elements");
      todosContainer.dataset.index = todo.uniqueId;

      todosContainerHolder.append(todosContainer);

      todosContainer.append(todoCheckBoxTitleDiv, dueDateDiv, todoButtonsDiv);

      todoCheckBoxTitleDiv.append(orangeUnfilledCircleDiv, todoParagraph);
      dueDateDiv.append(dateImage, dueDateParagraph);
      todoButtonsDiv.append(editImage, deleteImage);
    }
  });
};



function updateCurrentProjectHeading(currentProjectHeading, projectInstanceText) {
  currentProjectHeading.textContent = projectInstanceText.textContent;
};


function removeProjectDiv(button) {
  button.parentElement.remove();
};

function closeProjectAddDialog() {
  const projectAddDialog = document.querySelector("#project-add-dialog");
  projectAddDialog.close();
};

function showProjectAddDialog() {
  const projectAddDialog = document.querySelector("#project-add-dialog");
  projectAddDialog.showModal();
};


function showValuesOnEditForm(event) {
  const parent = event.target.parentElement.parentElement; // Navigate up
  const secondChild = parent.children[0]; // Access the second child (the child at index 1)
  const thirdChild = secondChild.children[1];
  const fourthChild = parent.children[1];
  const fifthChild = parent.children[1];

  textEditInputTodoTitle.value = thirdChild.textContent;
  textEditInputTodoDueDate.value = fifthChild.textContent;
};


todosCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("click", () => {
    checkbox.classList.toggle("todo-checkboxes-filled");
  });
});

addProjectButton.addEventListener("click", () => {
  const projectAddDialog = document.querySelector("#project-add-dialog");
  showProjectAddDialog();
});

projectAddCancelButton.addEventListener("click", () => {
  const projectAddDialog = document.querySelector("#project-add-dialog");
  closeProjectAddDialog();
});

projectAddSaveButton.addEventListener("click", () => {

  createNewProject(textInputProjectTitle);
  closeProjectAddDialog();
  saveToLocalStorage();
  displayProjects(projectDiv);
});

export { displayProjects, displayElementsInContent };
