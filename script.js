function loadTodos() {

    const todo = JSON.parse(localStorage.getItem("todo")) || [];
    return todo;
}

function appendtodoInHtml (todo) {
    
    const todoList = document.getElementById("todoList");
    const listItem = document.createElement("li");
    listItem.textContent = todo.name;
    listItem.setAttribute("data-id", todo.id);
    listItem.classList.add("todoItem");

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete";
    deletebtn.classList.add("deletebtn");

    const editbtn = document.createElement("button");
    editbtn.textContent = "Edit";
    editbtn.classList.add("editbtn");

    const completebtn = document.createElement("button");
    completebtn.textContent = "Complete";
    completebtn.classList.add("completebtn");

    const listbuttondiv = document.createElement("div");

    listbuttondiv.appendChild(editbtn);
    listbuttondiv.appendChild(deletebtn);
    listbuttondiv.appendChild(completebtn);

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
    const todo = loadTodos();
    const element = event.target;
    const value = element.getAttribute("data-tab");
    const todoList = document.getElementById("todoList");
    const activeTab = document.querySelector(".active");
    activeTab.classList.toggle('active');
    event.target.classList.add('active');
    
    todoList.innerHTML = '';
    if(value == "all"){
        for(let k in todo) {
            appendtodoInHtml(todo[k]);
    }
    }else if(value == "pending"){
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

function executeCompletedAction(event) {

    const todoItem = event.target.parentElement.parentElement;
    const dataId = todoItem.getAttribute('data-id');
    console.log(dataId);
    const todo = loadTodos();
    todo[dataId].isCompleted = !todo[dataId].isCompleted;
    localStorage.setItem("todo", JSON.stringify(todo));
    
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

    for(let btn of filterBtns) {
        
        btn.addEventListener("click", executeFilterAction);
    
    }

    for(let btn of completedBtns) {

        btn.addEventListener("click", executeCompletedAction); 
    
    }

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