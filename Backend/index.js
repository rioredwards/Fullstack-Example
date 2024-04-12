// Import the Libraries that we need
const { MongoClient } = require("mongodb"); // <- this is our database (MongoDB)
const express = require("express"); // <- this is our server (Express)
const cors = require("cors"); // <- this is needed for security reasons (CORS)
require("dotenv").config(); // <- This is needed for using environment variables (.env)

// Create an Express app object which will be used to define our server
// We store it in a variable called app (it's just a convention)
const app = express();
// Define the port that our server will run on
const port = 3000;

// Here, we access our username and password for MongoDB
// which are being stored in a file called .env
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

// Define the URI for our MongoDB database
// our database is actually accessed through the internet via this URI
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.pnosh5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient object which will be used to connect to our database
// We store it in a variable called client (again, just a convention)
const client = new MongoClient(uri);

// Setup our server with CORS enabled
// This allows us to specify which websites can access our server
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // <- This is the port that our frontend is running on
    credentials: true,
  })
);

// Define a function that starts our server
async function startServer() {
  await client.connect(); // <- this connects us to our database
  console.log("✨ Connected to MongoDB");

  // Start our server on the specified port
  app.listen(port, () => {
    console.log(`🚀 Todos server is listening on port ${port}`);
  });
}

// Define a function to get all todos from the database
async function getTodosFromDatabase() {
  // This is where we actually interact with our database
  const db = client.db();
  // We specify which collection we want to interact with (in this case, "todos")
  const todosCollection = db.collection("todos");
  // We retrieve all the todos from the collection and convert them to an array
  const todos = await todosCollection.find().toArray();
  return todos;
}

// Define a function to insert a new todo into the database
async function addTodoToDatabase(todo) {
  // Again, we interact with our database here
  const db = client.db();
  // Again, we want the "todos" collection
  const todosCollection = db.collection("todos");
  // We insert the new todo into the collection
  await todosCollection.insertOne(todo);
}

// The following code is VERY IMPORTANT!
// Every server needs to define "routes"
// Routes define the different ways a frontend can interact with our server
// This is where REST and HTTP come into play
// This server has two routes: GET "/" and POST "/"

// The GET route here retrieves all todos from our database and returns them to the frontend
app.get("/", async (req, res) => {
  // We call our function to get all todos from the database
  const todos = await getTodosFromDatabase();
  // We send the todos back to the frontend
  res.send(todos);
});

// The POST route here receives a new todo from the frontend and adds it to the database
app.post("/", express.json(), async (req, res) => {
  // If the frontend uses this route, we expect it to send a new todo in the request body
  const todo = req.body;
  // We call our function to add the new todo to the database
  await addTodoToDatabase(todo);
  // We send the new todo back to the frontend, so it knows the todo was added successfully
  res.send(todo);
});

// Up until now, we've only defined our server and database functions
// Here is where we call our function to actually start our server
startServer();
