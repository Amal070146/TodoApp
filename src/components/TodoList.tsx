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

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDelete,
  onEdit,
  onUpdateStatus,
}) => {
  const [checkboxes, setCheckboxes] = useState(0);

  const [storedCountTodo, setstoredCountTodo] = useState(0);
  useEffect(() => {
    const storedCountTodo = localStorage.getItem("countTodo");
    const num = Number(storedCountTodo);
    setstoredCountTodo(num);
  });
  console.log(storedCountTodo);

  const checkboxupdated = (id: number, comp: boolean) => {
    console.log("checked");
    setCheckboxes(checkboxes);

    console.log(id);
    if (comp == false) {
      console.log(comp);
      setCheckboxes(checkboxes + 1);
    } else {
      console.log(comp);
      setCheckboxes(checkboxes - 1);
    }
    console.log(checkboxes);
    localStorage.setItem("checkedItem", checkboxes.toString());
  };

  return (
    <ol>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onUpdateStatus(todo.id)}
            onClick={() => checkboxupdated(todo.id, todo.completed)}
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
    </ol>
  );
};

export default TodoList;
