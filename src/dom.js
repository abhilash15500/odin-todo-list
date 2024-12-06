import { Project, myProjects, onTodoDialogSaveButtonClick, projectDiv } from "./index.js";
import deleteIcon from './images/delete-svg.svg';
import calendarIcon from './images/calender.svg';
import editIcon from './images/edit-svg.svg';
import todoListHigherImg from "./images/todolisthigher.png";

const projectAddDialog = document.querySelector("#project-add-dialog");
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
let currentTodoIndex;


addTodoButton.addEventListener("click", () => {
  console.log("hiiiiiiii");
  todoAddDialog.showModal();

});


todoAddDialogCancelButton.addEventListener("click", () => {
  todoAddDialog.close();
})

todoAddDialogSaveButton.addEventListener("click", () => {
  onTodoDialogSaveButtonClick();
  todoAddDialog.close();
  console.log(myProjects);
  console.log(currentProjectIndexForOperation);

  if (currentProjectIndexForOperation == undefined) {
    currentProjectIndexForOperation = 0;
  }
  displayElementsInContent(currentProjectIndexForOperation);


})


todoEditSaveButton.addEventListener("click", () => {
  console.log("yo niceeeeeee :)");
  todoEditDialog.close();

if(currentProjectIndexForOperation == undefined) {
  currentProjectIndexForOperation = 0;
}
  console.log(`${currentTodoIndex} and ${currentProjectIndexForOperation}`);
  
  let titleValue = textEditInputTodoTitle.value;
  let dueDateValue = textEditInputTodoDueDate.value;

  myProjects[currentProjectIndexForOperation].todos[currentTodoIndex].editTodo(titleValue,dueDateValue,false);
  console.log(myProjects);


  displayElementsInContent(currentProjectIndexForOperation);
});


todoEditCancelButton.addEventListener("click", () => {
  console.log("lol no!");
  todoEditDialog.close();
});

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
      addTodoButton.style.display = "block";
  
      console.log("event fired hehe!");

      let uniqueIdOfProject = event.currentTarget.getAttribute("data-index");

      console.log(myProjects);
      console.log(uniqueIdOfProject);


      currentProjectIndexForOperation = myProjects.findIndex(project => project !== undefined && project.uniqueId == uniqueIdOfProject);
      console.log(currentProjectIndexForOperation);
      currentProjectIndexForOperation = myProjects[currentProjectIndexForOperation].currentProjectIdentifier();




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
}



function emptyDivFillerDom() {
  currentProjectHeading.textContent = "WOW , SUCH EMPTYYYYYYYYYYY?";
  todosContainerHolder.innerHTML = "";

  const todoListHigherImage = document.createElement("img");
  todoListHigherImage.classList.add("todo-list-higher-image");
  todoListHigherImage.src = todoListHigherImg;

  todosContainerHolder.append(todoListHigherImage);
  addTodoButton.style.display = "none";
  
}


function displayElementsInContent(currentProjectIndex) {
  todosContainerHolder.innerHTML = "";
  currentProjectHeading.textContent = myProjects[currentProjectIndex].title;

  let currentProjectTodos = myProjects[currentProjectIndex].todos;

  currentProjectTodos.forEach(todo => {
    if (todo.completed == true) {
      let orangeFilledCircleDiv = document.createElement("div");
      orangeFilledCircleDiv.classList.add("todo-checkboxes", "todo-checkboxes-filled");

      orangeFilledCircleDiv.addEventListener("click",(event)=>{
        let clickedTodoDatasetIndexNumber = event.target.parentElement.parentElement.getAttribute('data-index');
        currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo !== undefined && todo.uniqueId == clickedTodoDatasetIndexNumber);

        myProjects[currentProjectIndex].todos[currentTodoIndex].markTodoAsIncomplete();

        displayElementsInContent(currentProjectIndex);
      })



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
        currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo !== undefined && todo.uniqueId == clickedTodoDatasetIndexNumber);

        console.log(`${currentProjectIndex} is curr pro index and ${currentTodoIndex}`);

        const parent = event.target.parentElement.parentElement; // Navigate up
        const secondChild = parent.children[0]; // Access the second child (the child at index 1)
        const thirdChild = secondChild.children[1];
        const fourthChild = parent.children[1];
        const fifthChild = parent.children[1];

        textEditInputTodoTitle.value = thirdChild.textContent;
        textEditInputTodoDueDate.value = fifthChild.textContent;
        todoEditDialog.showModal();




      });


      let deleteImage = document.createElement("img");
      deleteImage.classList.add("todo-buttons");
      deleteImage.src = deleteIcon;

      deleteImage.addEventListener("click", (event) => {

        event.target.parentElement.parentElement.remove();  // for dom

        // for logic
        let currentTodoDataIndex = event.target.parentElement.parentElement.getAttribute('data-index');
        
        let currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo !== undefined && todo.uniqueId == currentTodoDataIndex);



        delete myProjects[currentProjectIndex].todos[currentTodoIndex];
        console.log(myProjects);


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

      orangeUnfilledCircleDiv.addEventListener("click",(event)=>{
        let clickedTodoDatasetIndexNumber = event.target.parentElement.parentElement.getAttribute('data-index');
        currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo !== undefined && todo.uniqueId == clickedTodoDatasetIndexNumber);

        myProjects[currentProjectIndex].todos[currentTodoIndex].markTodoAsComplete();

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
        currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo !== undefined && todo.uniqueId == clickedTodoDatasetIndexNumber);

        console.log(`${currentProjectIndex} is curr pro index and ${currentTodoIndex}`);

        const parent = event.target.parentElement.parentElement; // Navigate up
        const secondChild = parent.children[0]; // Access the second child (the child at index 1)
        const thirdChild = secondChild.children[1];
        const fourthChild = parent.children[1];
        const fifthChild = parent.children[1];

        textEditInputTodoTitle.value = thirdChild.textContent;
        textEditInputTodoDueDate.value = fifthChild.textContent;
        todoEditDialog.showModal();

      });





      let deleteImage = document.createElement("img");
      deleteImage.classList.add("todo-buttons");
      deleteImage.src = deleteIcon;

      deleteImage.addEventListener("click", (event) => {

        event.target.parentElement.parentElement.remove();  //dom

        //logic

        // for logic
        let currentTodoDataIndex = event.target.parentElement.parentElement.getAttribute('data-index');
        let currentTodoIndex = myProjects[currentProjectIndex].todos.findIndex(todo => todo !== undefined && todo.uniqueId == currentTodoDataIndex);
        delete myProjects[currentProjectIndex].todos[currentTodoIndex];
        console.log(myProjects);

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
}



function updateCurrentProjectHeading(currentProjectHeading, projectInstanceText) {
  currentProjectHeading.textContent = projectInstanceText.textContent;
}

function removeProjectFromArray(uniqueIdOfButtonDiv) {
  let indexToDelete = myProjects.findIndex(project => project !== undefined && project.uniqueId == uniqueIdOfButtonDiv);

  delete myProjects[indexToDelete]
  console.log(myProjects);
}

function removeProjectDiv(button) {
  button.parentElement.remove();
}

function closeProjectAddDialog() {
  projectAddDialog.close();
}

function showProjectAddDialog() {
  projectAddDialog.showModal();
}

todosCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("click", () => {
    checkbox.classList.toggle("todo-checkboxes-filled");
  });
});

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

export { displayProjects, displayElementsInContent };
