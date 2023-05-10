import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodoModal from "./components/AddTodoModal";
import EditTodoModal from "./components/EditTodoModal";
import "./App.css";
import { useNavigate } from "react-router-dom";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [countTodo, setCountTodo] = useState(0);
  const [storedCheckbox, setstoredCheckbox] = useState(0);
  useEffect(() => {
    const storedCheckbox = localStorage.getItem("checkedItem");
    const numb = Number(storedCheckbox);
    setstoredCheckbox(numb);
    if (countTodo == 0) {
      let m = 0;
      setstoredCheckbox(m);
    }
    if (Number(storedCheckbox) < 0) {
      setstoredCheckbox(0);
    }
  });
  const navigate = useNavigate();
  const logout = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/login");
  };

  const addTodo = (text: string) => {
    const todo: Todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    localStorage.setItem("countTodo", countTodo.toString());
    console.log(showAddModal);
    setCountTodo(countTodo + 1);
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setCountTodo(countTodo - 1);
    setTodos(updatedTodos);
    if (countTodo == 0) {
      setstoredCheckbox(0);
    }
  };

  const updateStatus = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const openEditModal = (id: number) => {
    setEditTodoId(id);
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const updateTodo = (id: number, text: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: text } : todo
    );
    setTodos(updatedTodos);
  };
  return (
    <div className="todoapp">
      <div className="header">
        <h1>TODO</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <AddTodoModal isOpen={true} onClose={closeModals} onAddTodo={addTodo} />
      <div className="taskcount">
        <p>Current Task : {countTodo} </p>
        <p>
          Task Completed : {storedCheckbox} of {countTodo}
        </p>
      </div>
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onEdit={openEditModal}
        onUpdateStatus={updateStatus}
      />

      {showEditModal && editTodoId && (
        <EditTodoModal
          isOpen={showEditModal}
          todoId={editTodoId}
          initialText={todos.find((todo) => todo.id === editTodoId)?.text || ""}
          onClose={closeModals}
          onUpdateTodo={updateTodo}
        />
      )}
    </div>
  );
};

export default Todo;
