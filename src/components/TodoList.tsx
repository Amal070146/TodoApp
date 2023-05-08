import React from "react";
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
    </ol>
  );
};

export default TodoList;
