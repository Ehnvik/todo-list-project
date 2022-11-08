import { Todo } from "./models/input";

window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  const newTodoForm = document.querySelector("#new-todo-form");

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    todo = new Todo(e.target.elements.content.value, false);

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();

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

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("main__list__item__delete-button");

    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("main__list__item__edit-button");

    const doneCheckbox = document.createElement("input");
    doneCheckbox.type = "checkbox";
    doneCheckbox.checked = todo.done;
    doneCheckbox.classList.add("main__list__item__done-button");

    todoItem.innerHTML = `<input class="main__list__item__content" type="text" value="${todo.content}" readonly>`;

    todoList.appendChild(todoItem);
    todoItem.appendChild(content);
    todoItem.appendChild(doneCheckbox);
    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);

    // if (todo.content === "" || todo.content < "a" || todo.content < 1) {
    //   console.log("Vänligen fyll i något att göra först!");
    //   todoItem.remove();
    // }

    const input = todoItem.querySelector("input");

    if (todo.done) {
      input.classList.add("list-done");
      doneCheckbox.classList.add("main__list__item__done-button");
    }

    doneCheckbox.addEventListener("change", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        input.classList.add("list-done");
        doneCheckbox.classList.add("main__list__item__done-button");
      } else {
        input.classList.remove("list-done");
      }

      showTodos();
    });

    editButton.addEventListener("click", () => {
      const input = todoItem.querySelector("input");
      input.removeAttribute("readonly");
      editButton.style.opacity = "0.6";
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        showTodos();
      });
    });
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((todoItem) => todoItem != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      showTodos();
    });
  });
}
