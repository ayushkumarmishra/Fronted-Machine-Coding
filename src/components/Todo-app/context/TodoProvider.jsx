import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "./TodoContext";

export const TodoProvider = ({ children }) => {
  const [todosList, setTodosList] = useState([]);

  const addTodoList = (input) => {
    if (input.trim() === "") return;

    const newTodo = {
      id: uuidv4(),
      text: input.trim(),
      isChecked: false,
    };

    setTodosList((prev) => [...prev, newTodo]);
  };

  const toggleCheckbox = (id) => {
    setTodosList(
      todosList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isChecked: !todo.isChecked };
        }
        return todo;
      })
    );
  };

  const deleteTodoList = (id) => {
    setTodosList(todosList.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todosList,
        addTodoList,
        toggleCheckbox,
        deleteTodoList,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
