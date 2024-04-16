const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.pnosh5s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

async function startServer() {
  await client.connect();
  console.log("✨ Connected to MongoDB");

  app.listen(port, () => {
    console.log(`🚀 Todos server is listening on port ${port}`);
  });
}

async function getTodosFromDatabase() {
  const db = client.db();

  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find().toArray();
  return todos;
}

async function addTodoToDatabase(todo) {
  const db = client.db();

  const todosCollection = db.collection("todos");

  await todosCollection.insertOne(todo);
}

app.get("/", async (req, res) => {
  const todos = await getTodosFromDatabase();

  res.send(todos);
});

app.post("/", express.json(), async (req, res) => {
  const todo = req.body;

  await addTodoToDatabase(todo);

  res.send(todo);
});

startServer();
