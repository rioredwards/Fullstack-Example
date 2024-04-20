const inputEl = document.querySelector("input");
const formEl = document.querySelector("form");
const ulEl = document.querySelector("ul");

let todos = ["Eat Cookies", "Learn JS", "Eat More Cookies"];

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTodo = inputEl.value;

  if (!newTodo) {
    return;
  }

  todos.unshift(newTodo);
  renderTodos();
  inputEl.value = "";
});

function renderTodos() {
  ulEl.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const li = document.createElement("li");
    li.textContent = todos[i];
    ulEl.appendChild(li);
  }
}

renderTodos();
