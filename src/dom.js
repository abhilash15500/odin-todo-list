import { Project, myProjects, onTodoDialogSaveButtonClick, projectDiv, saveToLocalStorage, retrieveFromLocalStorage, ifCurrentProjectIndexForOperationIsUndefined, editCurrentTodo, addProjectLabelToDom, getCurrentProjectIndexForOperation, getCurrentProjectTodos, markCurrentTodoAsIncomplete, markCurrentTodoAsComplete, getCurrentTodoIndex, currentTodoDataIndex, deleteATodo, removeProjectFromArray, createNewProject, currentTodoIndex } from "./index.js";
import deleteIcon from './images/delete-svg.svg';
import calendarIcon from './images/calender.svg';
import editIcon from './images/edit-svg.svg';

import { helperFunction } from "./helperFunctions.js";

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
let selectProjectPopUp = document.querySelector("#select-project-popup");
let selectProjectPopUpCloseButton = document.querySelector(".close-btn");




addTodoButton.addEventListener("click", () => {
  if(typeof currentProjectIndexForOperation == "undefined") {
    
    selectProjectPopUp.showModal();
  }
  else {
    todoAddDialog.showModal();
  }
});


selectProjectPopUpCloseButton.addEventListener("click",()=>{
  selectProjectPopUp.close();
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

    let projectInstances = helperFunction('div', ['sidebar-elements', 'project-instances'], '', '', { 'data-index': project.uniqueId });

    let projectIconTextDiv = helperFunction('div', ['project-icon-text-div']);

    let orangeCircle = helperFunction('div', ['orange-circle']);

    let projectInstanceText = helperFunction('p', ['project-instance-text'], `${project.title}`);

    let projectDeleteButton = helperFunction('img', ['project-delete-button'], '', `${deleteIcon}`)

    projectDiv.appendChild(projectInstances);
    projectInstances.appendChild(projectIconTextDiv);
    projectIconTextDiv.append(orangeCircle, projectInstanceText);
    projectInstances.appendChild(projectDeleteButton);


    projectInstances.addEventListener("click", (event) => {
      addTodoButton.style.display = "block";
      let uniqueIdOfProject = event.currentTarget.getAttribute("data-index");

      currentProjectIndexForOperation = getCurrentProjectIndexForOperation(uniqueIdOfProject, currentProjectIndexForOperation);

      displayElementsInContent(currentProjectIndexForOperation);
    });
  });


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

      let orangeFilledCircleDiv = helperFunction("div", ["todo-checkboxes", "todo-checkboxes-filled"]);

      orangeFilledCircleDiv.addEventListener("click", (event) => {
        markCurrentTodoAsIncomplete(event, currentProjectIndex, currentTodoIndex);
        displayElementsInContent(currentProjectIndex);
      });


      let finishedTodoParagraph = helperFunction('p', ["finished-todo"], `${todo.title}`);

      let dateImage = helperFunction('img', ["due-date-icon"], '', `${calendarIcon}`)

      let dueDateParagraph = helperFunction('p', ["due-date-text", "due-date-text-striked"], `${todo.dueDate}`)

      let editImage = helperFunction('img', ["todo-buttons"], '', `${editIcon}`);

      editImage.addEventListener("click", (event) => {

        let clickedTodoDatasetIndexNumber = event.target.parentElement.parentElement.getAttribute('data-index');

        getCurrentTodoIndex(currentProjectIndex, clickedTodoDatasetIndexNumber, event);

        console.log(`${currentProjectIndex} is curr pro index and ${currentTodoIndex}`);

        showValuesOnEditForm(event);

        todoEditDialog.showModal();

      });


      let deleteImage = helperFunction('img', ["todo-buttons"], "", `${deleteIcon}`);

      deleteImage.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.remove();  // for dom

        // for logic
        let currentTodoDataIndex = event.target.parentElement.parentElement.getAttribute('data-index');
        deleteATodo(currentTodoDataIndex);
        saveToLocalStorage();
      });

      let todoCheckBoxTitleDiv = helperFunction('div', ['todo-checkbox-title-div']);
      let dueDateDiv = helperFunction('div', ['due-date-div']);
      let todoButtonsDiv = helperFunction('div', ['todo-buttons-div']);
      let todosContainer = helperFunction('div', ['todos-container', 'content-elements'], "", "", { 'data-index': `${todo.uniqueId}` });

      todosContainerHolder.append(todosContainer);
      todosContainer.append(todoCheckBoxTitleDiv, dueDateDiv, todoButtonsDiv);
      todoCheckBoxTitleDiv.append(orangeFilledCircleDiv, finishedTodoParagraph);
      dueDateDiv.append(dateImage, dueDateParagraph);
      todoButtonsDiv.append(editImage, deleteImage);

    } else if (todo.completed == false) {

      let orangeUnfilledCircleDiv = helperFunction("div", ["todo-checkboxes"]);

      orangeUnfilledCircleDiv.addEventListener("click", (event) => {

        markCurrentTodoAsComplete(event, currentProjectIndex, currentTodoIndex);
        displayElementsInContent(currentProjectIndex);
      });


      let todoParagraph = helperFunction("p", [], `${todo.title}`);

      let dateImage = helperFunction("img", ["due-date-icon"], '', `${calendarIcon}`);

      let dueDateParagraph = helperFunction('p', ["due-date-text"], `${todo.dueDate}`);

      let editImage = helperFunction("img", ["todo-buttons"], '', `${editIcon}`);


      editImage.addEventListener("click", (event) => {

        let clickedTodoDatasetIndexNumber = event.target.parentElement.parentElement.getAttribute('data-index');
        getCurrentTodoIndex(currentProjectIndex, clickedTodoDatasetIndexNumber, event);
        console.log(`${currentProjectIndex} is curr pro index and ${currentTodoIndex}`);
        showValuesOnEditForm(event);
        todoEditDialog.showModal();
      });


      let deleteImage = helperFunction('img', ["todo-buttons"], '', `${deleteIcon}`);

      deleteImage.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.remove();  //dom

        //logic 
        let currentTodoDataIndex = event.target.parentElement.parentElement.getAttribute('data-index');
        deleteATodo(currentTodoDataIndex);
        saveToLocalStorage();
      });


      let todoCheckBoxTitleDiv = helperFunction('div', ["todo-checkbox-title-div"]);

      let dueDateDiv = helperFunction('div', ["due-date-div"]);

      let todoButtonsDiv = helperFunction('div', ["todo-buttons-div"]);

      let todosContainer = helperFunction('div', ["todos-container", "content-elements"], '', '', { 'data-index': todo.uniqueId });


      todosContainerHolder.append(todosContainer);
      todosContainer.append(todoCheckBoxTitleDiv, dueDateDiv, todoButtonsDiv);
      todoCheckBoxTitleDiv.append(orangeUnfilledCircleDiv, todoParagraph);
      dueDateDiv.append(dateImage, dueDateParagraph);
      todoButtonsDiv.append(editImage, deleteImage);
    };
  });
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