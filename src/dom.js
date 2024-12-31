// imports 

import { Project, myProjects, onTodoDialogSaveButtonClick, projectDiv, saveToLocalStorage, retrieveFromLocalStorage, ifCurrentProjectIndexForOperationIsUndefined, editCurrentTodo, addProjectLabelToDom, getCurrentProjectIndexForOperation, getCurrentProjectTodos, markCurrentTodoAsIncomplete, markCurrentTodoAsComplete, getCurrentTodoIndex, currentTodoDataIndex, deleteATodo, removeProjectFromArray, createNewProject, currentTodoIndex, isFutureDate, setCurrentProjectIndexToLocalStorage,setTimeoutDelayForModal } from "./index.js";
import deleteIcon from './images/delete-svg.svg';
import calendarIcon from './images/calender.svg';
import editIcon from './images/edit-svg.svg';
import { createElementFunction } from "./helperFunctions.js";

// variables 

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
let textEditInputTodoDescription = document.querySelector("#text-edit-input-description");
let textEditInputTodoPriority = document.querySelector("#todo-edit-priority");
let fillAllFieldsPopUp = document.querySelector("#fill-out-all-fields-pop-up");
let selectProjectPopUp = document.querySelector("#select-project-popup");
let selectProjectPopUpCloseButton = document.querySelector(".close-btn");
let todoTitle = document.querySelector("#text-input-todo-title");
let todoDescription = document.querySelector("#text-input-todo-description");
let todoDueDate = document.querySelector("#text-input-todo-due-date");
let todoPriority = document.querySelector("#todo-priority");


// event listeners 

addTodoButton.addEventListener("click", () => {
  if (typeof currentProjectIndexForOperation == "undefined") {
    selectProjectPopUp.showModal();
    setTimeoutDelayForModal(1200,selectProjectPopUp);
  }
  else {
    todoAddDialog.showModal();
  }
});


todoAddDialogCancelButton.addEventListener("click", () => {
  todoAddDialog.close();
});

todoAddDialogSaveButton.addEventListener("click", (event) => {

  if (!todoTitle.value.trim() || !todoDescription.value.trim() || !todoDueDate.value.trim() || isFutureDate(todoDueDate.value) == false || !todoPriority.value.trim()) {
    event.preventDefault();
    fillAllFieldsPopUp.showModal();
    setTimeoutDelayForModal(1700,fillAllFieldsPopUp);
    return;
  }

  onTodoDialogSaveButtonClick();
  todoAddDialog.close();
  ifCurrentProjectIndexForOperationIsUndefined(currentProjectIndexForOperation);
  saveToLocalStorage();
  renderTodos(currentProjectIndexForOperation);
});


todoEditSaveButton.addEventListener("click", (event) => {

  if (!textEditInputTodoTitle.value.trim() || !textEditInputTodoDueDate.value.trim() || isFutureDate(textEditInputTodoDueDate.value) == false || !textEditInputTodoDescription.value.trim() || !textEditInputTodoPriority) {
    fillAllFieldsPopUp.showModal();
    setTimeoutDelayForModal(1700,fillAllFieldsPopUp);
    event.preventDefault();
    return;
  };

  todoEditDialog.close();

  if (currentProjectIndexForOperation == undefined) {
    currentProjectIndexForOperation = 0;
  };

  let titleValue = textEditInputTodoTitle.value;
  let dueDateValue = textEditInputTodoDueDate.value;
  let descriptionValue = textEditInputTodoDescription.value;
  let priorityValue = textEditInputTodoPriority.value;

  editCurrentTodo(currentProjectIndexForOperation, currentTodoIndex, titleValue, dueDateValue, descriptionValue, priorityValue);
  saveToLocalStorage();
  renderTodos(currentProjectIndexForOperation);
});



todoEditCancelButton.addEventListener("click", () => {
  todoEditDialog.close();
});

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
  closeProjectAddDialog();
});

projectAddSaveButton.addEventListener("click", (event) => {
  if (!textInputProjectTitle.value.trim()) {
    event.preventDefault();
    return;
  }
  createNewProject(textInputProjectTitle);
  closeProjectAddDialog();
  renderProjects(projectDiv);
});




// functions 
function renderProjects(projectDiv) {
  projectDiv.innerHTML = "";
  let listOfProjects = Project.viewAllProjects();    //get list of projects

  addProjectLabelToDom();

  listOfProjects.forEach(project => {

    let projectInstances = createElementFunction('div', ['sidebar-elements', 'project-instances'], '', '', { 'data-index': project.uniqueId });

    let projectIconTextDiv = createElementFunction('div', ['project-icon-text-div']);

    let orangeCircle = createElementFunction('div', ['orange-circle']);

    let projectInstanceText = createElementFunction('p', ['project-instance-text'], `${project.title}`);

    let projectDeleteButton = createElementFunction('img', ['project-delete-button'], '', `${deleteIcon}`)

    projectDiv.appendChild(projectInstances);
    projectInstances.appendChild(projectIconTextDiv);
    projectIconTextDiv.append(orangeCircle, projectInstanceText);
    projectInstances.appendChild(projectDeleteButton);


    projectInstances.addEventListener("click", (event) => {
      addTodoButton.style.display = "block";
      let uniqueIdOfProject = event.currentTarget.getAttribute("data-index");

      currentProjectIndexForOperation = getCurrentProjectIndexForOperation(uniqueIdOfProject, currentProjectIndexForOperation);

      renderTodos(currentProjectIndexForOperation);
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


function renderTodos(currentProjectIndex) {
  todosContainerHolder.innerHTML = "";
  currentProjectHeading.textContent = myProjects[currentProjectIndex].title;
  let currentProjectTodos = getCurrentProjectTodos(currentProjectIndex);

  currentProjectTodos.forEach(todo => {
    if (todo.completed == true) {

      let orangeFilledCircleDiv = createElementFunction("div", ["todo-checkboxes", "todo-checkboxes-filled"]);

      orangeFilledCircleDiv.addEventListener("click", (event) => {
        markCurrentTodoAsIncomplete(event, currentProjectIndex, currentTodoIndex);
        renderTodos(currentProjectIndex);
      });


      let finishedTodoParagraph = createElementFunction('p', ["finished-todo"], `${todo.title}`);

      let dateImage = createElementFunction('img', ["due-date-icon"], '', `${calendarIcon}`)

      let dueDateParagraph = createElementFunction('p', ["due-date-text", "due-date-text-striked"], `${todo.dueDate}`)

      let editImage = createElementFunction('img', ["todo-buttons"], '', `${editIcon}`);

      editImage.addEventListener("click", (event) => {

        let clickedTodoDatasetIndexNumber = event.target.parentElement.parentElement.getAttribute('data-index');

        getCurrentTodoIndex(currentProjectIndex, clickedTodoDatasetIndexNumber, event);


        showValuesOnEditForm(event, currentProjectIndex, currentTodoIndex);

        todoEditDialog.showModal();

      });


      let deleteImage = createElementFunction('img', ["todo-buttons"], "", `${deleteIcon}`);

      deleteImage.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.remove();  // for dom

        // for logic
        let currentTodoDataIndex = event.target.parentElement.parentElement.getAttribute('data-index');

        setCurrentProjectIndexToLocalStorage(currentProjectIndex);

        deleteATodo(currentTodoDataIndex);
        saveToLocalStorage();
      });

      let todoCheckBoxTitleDiv = createElementFunction('div', ['todo-checkbox-title-div']);
      let dueDateDiv = createElementFunction('div', ['due-date-div']);
      let todoButtonsDiv = createElementFunction('div', ['todo-buttons-div']);
      let todosContainer = createElementFunction('div', ['todos-container', 'content-elements'], "", "", { 'data-index': `${todo.uniqueId}` });

      todosContainerHolder.append(todosContainer);
      todosContainer.append(todoCheckBoxTitleDiv, dueDateDiv, todoButtonsDiv);
      todoCheckBoxTitleDiv.append(orangeFilledCircleDiv, finishedTodoParagraph);
      dueDateDiv.append(dateImage, dueDateParagraph);
      todoButtonsDiv.append(editImage, deleteImage);

    } else if (todo.completed == false) {

      let orangeUnfilledCircleDiv = createElementFunction("div", ["todo-checkboxes"]);

      orangeUnfilledCircleDiv.addEventListener("click", (event) => {

        markCurrentTodoAsComplete(event, currentProjectIndex, currentTodoIndex);
        renderTodos(currentProjectIndex);
      });

      let todoParagraph = createElementFunction("p", [], `${todo.title}`);

      let dateImage = createElementFunction("img", ["due-date-icon"], '', `${calendarIcon}`);

      let dueDateParagraph = createElementFunction('p', ["due-date-text"], `${todo.dueDate}`);

      let editImage = createElementFunction("img", ["todo-buttons"], '', `${editIcon}`);


      editImage.addEventListener("click", (event) => {
        let clickedTodoDatasetIndexNumber = event.target.parentElement.parentElement.getAttribute('data-index');
        getCurrentTodoIndex(currentProjectIndex, clickedTodoDatasetIndexNumber, event);
        showValuesOnEditForm(event, currentProjectIndex, currentTodoIndex);
        todoEditDialog.showModal();
      });

      let deleteImage = createElementFunction('img', ["todo-buttons"], '', `${deleteIcon}`);

      deleteImage.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.remove();  //dom

        //logic 
        let currentTodoDataIndex = event.target.parentElement.parentElement.getAttribute('data-index');

        setCurrentProjectIndexToLocalStorage(currentProjectIndex);
        deleteATodo(currentTodoDataIndex);
        saveToLocalStorage();
      });


      let todoCheckBoxTitleDiv = createElementFunction('div', ["todo-checkbox-title-div"]);

      let dueDateDiv = createElementFunction('div', ["due-date-div"]);

      let todoButtonsDiv = createElementFunction('div', ["todo-buttons-div"]);

      let todosContainer = createElementFunction('div', ["todos-container", "content-elements"], '', '', { 'data-index': todo.uniqueId });

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


function showValuesOnEditForm(event, currentProjectIndex, currentTodoIndex) {
  textEditInputTodoTitle.value = myProjects[currentProjectIndex].todos[currentTodoIndex].title;
  textEditInputTodoDueDate.value = myProjects[currentProjectIndex].todos[currentTodoIndex].dueDate;
  textEditInputTodoDescription.value = myProjects[currentProjectIndex].todos[currentTodoIndex].description;
  textEditInputTodoPriority.value = myProjects[currentProjectIndex].todos[currentTodoIndex].priority;
};


export { renderProjects, renderTodos };