// Get the input, form, and ul elements from the DOM
const inputEl = document.querySelector("input");
const formEl = document.querySelector("form");
const ulEl = document.querySelector("ul");

// Start with some default todos
let todos = ["Eat Cookies", "Learn JavaScript", "Eat More Cookies"];

// This will run when the form is submitted (when the user adds a new todo)
formEl.addEventListener("submit", (e) => {
  // This prevents the page from reloading which is the default behavior of a form submission
  e.preventDefault();

  // Get the text that the user typed into the input
  const newTodo = inputEl.value;

  // If the user didn't type anything, don't add a new todo
  if (!newTodo) {
    return;
  }

  // Add the new todo to the beginning of the todos array
  todos.unshift(newTodo);
  // Re-render the todos with the updated todos array
  renderTodos();
  // Reset the input value
  inputEl.value = "";
});

// This function will render the todos to the DOM
// It creates HTML elements for each todo in our todos array
// Then loads them into the ul element which is already in the DOM
function renderTodos() {
  // Clear the existing todos
  ulEl.innerHTML = "";

  // Loop through the todos array
  for (let i = 0; i < todos.length; i++) {
    // create a new <li> element
    const li = document.createElement("li");
    // set the text in the li element to the todo
    li.textContent = todos[i];
    // append the li element to the ul element
    ulEl.appendChild(li);
  }
}

// When the page loads, render the todos
renderTodos();
