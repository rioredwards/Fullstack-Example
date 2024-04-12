// Get the DOM elements
const inputEl = document.querySelector("input");
const formEl = document.querySelector("form");
const ulEl = document.querySelector("ul");

// Create an empty array to store the todos
let todos = [];

// This function runs when the page first loads
// It retrieves any existing todos from our server and renders them to the screen
async function start() {
  // Call our function that fetches todos from our server
  todos = await fetchTodosFromServer();
  // Call the render function
  render();
}

// This function fetches the todos from our server
async function fetchTodosFromServer() {
  // Fetch the todos from our server through HTTP 📬
  const res = await fetch("http://localhost:3000");
  // Convert the data from JSON to regular JavaScript
  const data = await res.json();
  return data;
}

// This function sends a new todo to our server which then adds it to a database
async function sendNewTodoToServer(todo) {
  // We have to format the todo as JSON
  const formattedTodo = JSON.stringify({ text: todo });
  // Send the formattedTodo to the server 📫
  const res = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formattedTodo, // Our todo is sent in the body of the HTTP request
  });
  // We sent a new todo from the frontend to the server!
  // This data is the todo we just added
  const data = await res.json();
  return data;
}

// Add an event listener to the form element
// This code runs when a user adds a todo
formEl.addEventListener("submit", async (e) => {
  // Submitting a form refreshes your page by default, but we don't want that
  // so we disable that behavior with the next line
  e.preventDefault();
  // Get the value of the input element (whatever the user typed in)
  const newTodo = inputEl.value;
  // If the user submitted without typing anything, we don't want to add an empty todo
  if (!newTodo) {
    return;
  }
  // Call our function that sends the todo to our server 🚀
  const data = await sendNewTodoToServer(newTodo);
  // The new todo is now in a database, thanks to our server!
  // Now we just need to add it to our local todos array (in the frontend)
  todos.unshift(data);
  // Call our render function to re-render the HTML with the new todo
  render();
  // Clear the input element, so that the user can type in a new todo
  inputEl.value = "";
});

// This function renders the todos to the screen
// It loops through our todos array and creates a new <li> element for each todo
function render() {
  // Clear the <ul> that contains the todos, so we don't render the same todos twice
  ulEl.innerHTML = "";
  // Loop through the todos array
  for (let i = 0; i < todos.length; i++) {
    // Create a new <li> element
    const li = document.createElement("li");
    // Set the text in the <li> element to be the todo's text
    li.textContent = todos[i].text;
    // Put the newly created <li> element into the <ul>
    ulEl.appendChild(li);
  }
}

// Up until now, we've only defined functions/variables, not actually called them
// This is where we start our frontend application
start();
