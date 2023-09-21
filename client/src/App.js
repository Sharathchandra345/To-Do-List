import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import TodoList from "./TodoList";
import Penguin from "./Penguin";
export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localStorage.getItem("ITEMS"));
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);
  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
        },
      ];
    });
  }
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          todo.completed = completed;
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  return (
    <>
      <h1 className="mainhead">To Do List</h1>
      <p className="quote">
        “If you don't sacrifice for what you want, what you want becomes the
        sacrifice”
      </p>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header"></h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <Penguin />
      <p className="made">
        Made in React by{" "}
        <a href="https://linktr.ee/sharath3" className="namelink">
          <span> Sharath Chandra</span>
        </a>
      </p>
    </>
  );
}
