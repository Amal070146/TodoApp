import React, { useEffect, useState } from "react";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";

import "./todo.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onUpdateStatus: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onEdit }) => {
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "Checkbox 1", checked: false },
    { id: 2, label: "Checkbox 2", checked: false },
    { id: 3, label: "Checkbox 3", checked: false },
    { id: 4, label: "Checkbox 3", checked: false },
    { id: 5, label: "Checkbox 3", checked: false },
    { id: 6, label: "Checkbox 3", checked: false },
    { id: 7, label: "Checkbox 3", checked: false },
  ]);
  const onUpdateStatus = (id: number) => {
    setCheckboxes((prevCheckboxes) => {
      return prevCheckboxes.map((todo) => {
        console.log("yhii");

        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      });
    });
  };
  const countCheckedBoxes = () => {
    const length = checkboxes.filter((todo) => todo.checked).length;
    localStorage.setItem("checkedItem", length.toString());
    return length;
  };

  const [storedCountTodo, setstoredCountTodo] = useState(0);
  useEffect(() => {
    let storedCountTodo = localStorage.getItem("countTodo");
    setstoredCountTodo(storedCountTodo);
  });

  return (
    <ol>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onUpdateStatus(todo.id)}
          />
          <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
          <div className="todolist">
            <button onClick={() => onEdit(todo.id)}>
              <RiEdit2Line />
            </button>
            <button onClick={() => onDelete(todo.id)}>
              <RiDeleteBinLine />
            </button>
          </div>
        </li>
      ))}
      <p>Number of checked boxes: {countCheckedBoxes()}</p>
    </ol>
  );
};

export default TodoList;
