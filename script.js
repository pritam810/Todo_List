const inputBox = document.getElementById("inputbox");
const addButton = document.getElementById("addbutton");
const todoList = document.getElementById("todoList");

let editTodo = null;

//function to add todo
const addtodo = () => {
  const inputtext = inputBox.value.trim();
  if (inputtext.length <= 0) {
    alert("You must write in your to do.");
    return false;
  }

  if (addButton.value === "Edit") {
    editLocalTodos(editTodo.target.previousElementSibling.innerHTML);

    editTodo.target.previousElementSibling.innerHTML = inputtext;
    addButton.value = "Add";
    inputBox.value = "";
  } else {
    //CREATING P TAG
    const li = document.createElement("li");
    const p = document.createElement("p");

    p.innerHTML = inputtext;
    li.appendChild(p);

    //CREATING EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn", "editbtn");
    li.appendChild(editBtn);

    //CREATING DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove";
    deleteBtn.classList.add("btn", "deletebtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputtext);
  }
};

//function to update todo
const updateTodo = (e) => {
  // console.log(e.target.innerHTML);

  if (e.target.innerHTML === "Remove") {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }
  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    // editLocalTodos(inputBox.value);

    inputBox.focus();
    addButton.value = "Edit";
    editTodo = e;
  }
};

//function to save local todos
const saveLocalTodos = (todo) => {
  let todoss;

  if (localStorage.getItem("todos") === null) {
    todoss = [];
  } else {
    todoss = JSON.parse(localStorage.getItem("todos"));
  }
  todoss.push(todo);
  console.log("SAVE LOCAL TODOS", todoss);
  localStorage.setItem("todos", JSON.stringify(todoss));
};

const getLocalTodos = () => {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      //CREATING P TAG
      const li = document.createElement("li");
      const p = document.createElement("p");

      p.innerHTML = todo;
      li.appendChild(p);

      //CREATING EDIT BUTTON
      const editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.classList.add("btn", "editbtn");
      li.appendChild(editBtn);

      //CREATING DELETE BUTTON
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Remove";
      deleteBtn.classList.add("btn", "deletebtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
      // inputBox.value="";
    });
  }
};

const deleteLocalTodos = (todo) => {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  let todotext = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todotext);
  // console.log(todoIndex);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const editLocalTodos = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoIndex = todos.indexOf(todo);

  todos[todoIndex] = inputBox.value;

  console.log("hello a", todos);
  localStorage.setItem("todos", JSON.stringify(todos));

  return;
};

document.addEventListener("DOMContentLoaded", getLocalTodos);
addButton.addEventListener("click", addtodo);
todoList.addEventListener("click", updateTodo);
