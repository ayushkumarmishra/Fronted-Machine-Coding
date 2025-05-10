import React, { useContext, useState } from "react";
import "./TodoApp.css";
import { TodoContext } from "./context/TodoContext";
import DisplayTodos from "./DisplayTodos";

const TodoApp = () => {
  const [input, setInput] = useState("");
  const { addTodoList } = useContext(TodoContext);

  const handleSubmit = () => {
    console.log("input", input);
    addTodoList(input);
    setInput("");
  };

  return (
    <div>
      <h1>Todo App</h1>
      <p>Welcome to the Todo App!</p>

      <div className="todoContainer">
        <input
          type="text"
          placeholder="Add your todo"
          className="todoinput"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="todoButton" onClick={handleSubmit}>
          Add Todo
        </button>
      </div>

      <DisplayTodos />
    </div>
  );
};

export default TodoApp;
