const inputEl = document.querySelector("input");
const formEl = document.querySelector("form");
const ulEl = document.querySelector("ul");

let todos = [];

async function start() {
  todos = await fetchTodosFromServer();

  render();
}

async function fetchTodosFromServer() {
  const res = await fetch("http://localhost:3000");

  const data = await res.json();
  return data;
}

async function sendNewTodoToServer(todo) {
  const formattedTodo = JSON.stringify({ text: todo });

  const res = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formattedTodo,
  });

  const data = await res.json();
  return data;
}

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTodo = inputEl.value;

  if (!newTodo) {
    return;
  }

  const data = await sendNewTodoToServer(newTodo);
  todos.unshift(data);
  render();
  inputEl.value = "";
});

function render() {
  ulEl.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const li = document.createElement("li");
    li.textContent = todos[i].text;
    ulEl.appendChild(li);
  }
}

start();
