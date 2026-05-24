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
    completebtn.textContent = "Complete";
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

function addTodoToLocalStorage(todoText) {
    const todo = loadTodos();

    const todoItem = {
            name : todoText,
            isCompleted : false,
            id : todo.length
        }
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

    const todoItem = event.target.parentElement.parentElement;
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
    const todoItem = event.target.parentElement.parentElement;
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

            console.log("Delete Button");
            
        }else if(event.target.className == "editbtn"){

            console.log("Delete Button");
            
        }
        
    })

    for(let btn of filterBtns) {
        
        btn.addEventListener("click", executeFilterAction);
    
    }

    // for(let btn of completedBtns) {

    //     btn.addEventListener("click", executeCompletedAction); 
    
    // }

    submitButton.addEventListener("click", () => {

        if(todoInput.value == '') {

            alert("Please write something for the todo");
 
        }else {
            
            let id = loadTodos().length;
            addTodoToLocalStorage(todoInput.value);
            appendtodoInHtml({name : todoInput.value, isCompleted : false, id : id});
            todoInput.value = '';
        }

    })

});