import express from "express";
import todoList from "./constants.js";

const app = express();
app.use(express.json());

const PORT = 8063;
const todoListLength = todoList.length;
app.listen(PORT, () => {
  console.log("server is running at PORT 8063");
});

app.get("/api/todos", (req, res) => {
  res.send(todoList);
});

app.post("/api/todos", (req, res) => {
  const newTodo = req.body;
  const updatedTodo = {
    ...newTodo,
    id: todoListLength + 1,
  };
  todoList.push(updatedTodo);

  res.status(201).send(updatedTodo);
});

app.put("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const dataToUpdate = req.body;
  console.log(dataToUpdate);

  const todo = todoList.findIndex((td) => td.id === id);

  if (todo !== -1) {
    todoList[todo] = { ...todoList[todo], ...dataToUpdate };
    res.send(todoList[todo]);
  }
});

app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todoList.findIndex((td) => td.id === id);

  if (index !== -1) {
    todoList.splice(index, 1);
    res.send({ message: "Todo deleted" });
  } else {
    res.status(404).send({ message: "Todo not found" });
  }
});
