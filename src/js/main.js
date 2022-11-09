import { Todo } from "./models/input";

let todos = JSON.parse(localStorage.getItem("todos")) || [];

window.addEventListener("load", () => {
  const newTodoForm = document.querySelector("#new-todo-form");

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("hej");
    const formInput = document.getElementById("content");
    let todo = new Todo(formInput.value, false);

    formInput.value = "";

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    showTodos();
  });
  showTodos();
});

function showTodos() {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("li");
    todoItem.classList.add("main__list__item");

    const content = document.createElement("span");
    content.classList.add("main__list__item__content");
    content.innerHTML = todo.content;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("main__list__item__delete-button");

    const doneCheckbox = document.createElement("input");
    doneCheckbox.type = "checkbox";
    doneCheckbox.checked = todo.done;
    doneCheckbox.classList.add("main__list__item__done-button");

    todoList.appendChild(todoItem);
    todoItem.appendChild(content);
    todoItem.appendChild(doneCheckbox);
    todoItem.appendChild(deleteButton);

    if (todo.content < "a" && todo.content < 1) {
      todos = todos.filter((listItem) => listItem != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      showTodos();
    }

    if (todo.done) {
      content.classList.add("list-done");
      doneCheckbox.classList.add("main__list__item__done-button");
    }

    doneCheckbox.addEventListener("change", () => {
      todo.done = !todo.done;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        content.classList.add("list-done");
        doneCheckbox.classList.add("main__list__item__done-button");
      } else {
        content.classList.remove("list-done");
      }

      showTodos();
    });

    deleteButton.addEventListener("click", () => {
      todos = todos.filter((listItem) => listItem != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      showTodos();
    });
  });
}
