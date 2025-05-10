import React, { useContext } from "react";
import { TodoContext } from "./context/TodoContext";

const DisplayTodos = () => {
  const { todosList, toggleCheckbox, deleteTodoList } = useContext(TodoContext);
  return (
    <ul className="displayTodosList">
      {todosList.map((todo) => (
        <li
          key={todo.id}
          className="todoItem"
          style={{ listStyleType: "none", marginBottom: "10px" }}
        >
          <input
            type="checkbox"
            checked={todo.isChecked}
            onChange={() => toggleCheckbox(todo.id)}
            className="checkbox"
          />
          <span className={todo.isChecked ? "checked" : ""}>{todo.text}</span>
          <button
            onClick={() => deleteTodoList(todo.id)}
            className="todoButton"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DisplayTodos;
