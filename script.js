function loadTodos() {

    const todo = JSON.parse(localStorage.getItem("todo")) || [];
    return todo;
}

function refreshTodo(tab) {
    
    const todo = loadTodos();
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = '';

    if(tab == "all"){
        for(let k in todo) {
            appendtodoInHtml(todo[k]);
    }
    }else if(tab == "pending"){
        for(let k in todo) {
            if(todo[k].isCompleted == false)
                appendtodoInHtml(todo[k]);
    }
    }else{
        for(let k in todo) {
            if(todo[k].isCompleted == true)
                appendtodoInHtml(todo[k]);
    }
    }

}

function appendtodoInHtml (todo) {
    
    const todoList = document.getElementById("todoList");
    const listItem = document.createElement("li");
    const checkIcon = document.createElement("img");
    checkIcon.classList.add("checkIcon");
    listItem.setAttribute("data-id", todo.id);
    listItem.classList.add("todoItem");

    //TODO TEXT
    const todoText = document.createElement("span");
    todoText.textContent = todo.name;

    //CHECK
    if(todo.isCompleted == true) {
        listItem.classList.add("completed");
        checkIcon.src = "images/Checked.png";
    }else{
        checkIcon.src = "images/Unchecked.png";
    }

    //BUTTONS
    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.classList.add("deletebtn");

    const editbtn = document.createElement("button");
    editbtn.textContent = "Edit";
    editbtn.classList.add("editbtn");

    const completebtn = document.createElement("button");
    if(todo.isCompleted == false){
        completebtn.textContent = "Complete";
    }else{
        completebtn.textContent = "Undo";
    }
    completebtn.classList.add("completebtn");

    //BUTTON DIV
    const listbuttondiv = document.createElement("div");
    listbuttondiv.appendChild(editbtn);
    listbuttondiv.appendChild(deletebtn);
    listbuttondiv.appendChild(completebtn);

    //LEFT-SIDE CONTAINER
    const leftSection = document.createElement("div");
    leftSection.classList.add("leftSection");
    leftSection.appendChild(checkIcon);
    leftSection.appendChild(todoText);

    //APPEND EVERYTHING
    listItem.appendChild(leftSection);
    listItem.appendChild(listbuttondiv);
    todoList.appendChild(listItem);
     
}

function addTodoToLocalStorage(todoItem) {

    const todo = loadTodos();
    todo.push(todoItem);
    localStorage.setItem("todo", JSON.stringify(todo));

}

function executeFilterAction(event){
        
    const element = event.target;
    const tab = element.getAttribute("data-tab");
    const activeTab = document.querySelector(".active");
    activeTab.classList.toggle('active');
    event.target.classList.add('active');
    refreshTodo(tab);

}

function executeCompletedAction(event) {

    const todoItem = event.target.closest("li");
    const dataId = todoItem.getAttribute('data-id');
    const todo = loadTodos();
    todo.forEach((item) => {
        if(item.id == dataId){
            item.isCompleted = !item.isCompleted;
        }
    });
    localStorage.setItem("todo", JSON.stringify(todo));
    
    const activeTab = document.querySelector(".active");
    const tab = activeTab.getAttribute("data-tab");
    refreshTodo(tab);
    
}

function executeDeleteAction(event) {

    const todoItem = event.target.closest("li");
    const dataId = Number(todoItem.getAttribute('data-id'));
    const todo = loadTodos();
    const updatedTodo = todo.filter(todo => todo.id !== dataId);
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
    
    const activeTab = document.querySelector(".active");
    const tab = activeTab.getAttribute("data-tab");
    refreshTodo(tab);
    
}

function executeEditAction(event) {

    const todoItem = event.target.closest("li");
    const dataId = Number(todoItem.getAttribute('data-id'));
    const span = todoItem.querySelector("span");
    const oldText  = span.textContent;

    span.contentEditable = true;
    span.focus();

    // TEXT SELECT KARO
    const range = document.createRange();
    range.selectNodeContents(span);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    //SAVE FUNCTION
    function saveChanges() {

        const todo = loadTodos();
        const updatedText = span.textContent;
        span.contentEditable = false;

        todo.forEach((item) => {
            if(item.id == dataId){
                item.name = updatedText;
            }
        });

        localStorage.setItem("todo", JSON.stringify(todo));
    }

    //PRESS ENTER OR ESCAPE EVENT
    span.onkeydown = (event) => {
        
        if(event.key == "Enter"){

            event.preventDefault();
            saveChanges();
            span.blur();

        }else if(event.key == "Escape"){

            span.contentEditable = false;
            span.textContent = oldText;
            span.blur();

        }
        
    }

    span.addEventListener("blur", saveChanges);

}

document.addEventListener("DOMContentLoaded", () => {

    const todo = loadTodos();

    for(let k in todo) {
        appendtodoInHtml(todo[k]);
    }

    const todoInput = document.getElementById("todoInput");

    const submitButton = document.getElementById("addTodo");

    const todoList = document.getElementById("todoList");

    const filterBtns = document.getElementsByClassName("tab-buttons");

    const completedBtns = document.getElementsByClassName("completebtn");

    todoList.addEventListener("click", (event) => {

        if(event.target.className == "completebtn"){

            executeCompletedAction(event);

        }else if(event.target.className == "deletebtn"){
            
            executeDeleteAction(event);
            
        }else if(event.target.className == "editbtn"){

            executeEditAction(event);
            
        }
        
    })

    for(let btn of filterBtns) {
        
        btn.addEventListener("click", executeFilterAction);
    
    }

    submitButton.addEventListener("click", () => {

        if(todoInput.value == '') {

            alert("Please write something for the todo");
 
        }else {
            
            let id = Date.now();
            addTodoToLocalStorage({name : todoInput.value, isCompleted : false, id : id});
            appendtodoInHtml({name : todoInput.value, isCompleted : false, id : id});
            todoInput.value = '';
        }

    })

});