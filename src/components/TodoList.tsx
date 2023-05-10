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
  const [valuecheck, setvaluecheck] = useState(0);
  const [storedCountTodo, setstoredCountTodo] = useState(0);
  useEffect(() => {
    const storedCountTodo = localStorage.getItem("countTodo");
    const num = Number(storedCountTodo);
    setstoredCountTodo(num);
    localStorage.setItem("valuecheck", valuecheck.toString());
  });

  const checkboxupdated = (id: number, comp: boolean) => {
    console.log("checked");

    if (storedCountTodo == 0) {
      setCheckboxes(0);
    }
    console.log(id);
    console.log(comp);
    console.log(checkboxes);
    let check;
    if (comp == false) {
      check = checkboxes + 1;
      console.log(comp, check);
      setvaluecheck(check);
      console.log("valuecheck", check);
      setCheckboxes(check);
      if (valuecheck > storedCountTodo) {
        setvaluecheck(storedCountTodo);
      }
    }
    if (comp == true) {
      check = checkboxes - 1;
      setCheckboxes(check);
      console.log(comp, check);
      setvaluecheck(check);
      console.log("valuecheck", valuecheck);

      if (checkboxes < 0) {
        setCheckboxes(0);
      }
    }

    localStorage.setItem("checkedItem", checkboxes.toString());
  };

  return (
    <ol>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            id="myCheckbox"
            checked={todo.completed}
            onChange={() => onUpdateStatus(todo.id)}
            onClick={() => checkboxupdated(todo.id, todo.completed)}
          />
          <label htmlFor="myCheckbox">
            <span className={todo.completed ? "" : "completed"}>
              {todo.text}
            </span>
          </label>
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
