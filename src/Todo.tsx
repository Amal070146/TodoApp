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
  const [storedCheckbox, setstoredCheckbox] = useState("");
  useEffect(() => {
    let storedCheckbox = localStorage.getItem("checkedItem");
    setstoredCheckbox(storedCheckbox);
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

    setCountTodo(countTodo + 1);
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setCountTodo(countTodo - 1);
    setTodos(updatedTodos);
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
  localStorage.setItem("countTodo", countTodo.toString());
  return (
    <div>
      <h1>Todo App</h1>
      <button onClick={() => setShowAddModal(true)}>Add Todo</button>
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onEdit={openEditModal}
        onUpdateStatus={updateStatus}
      />
      <AddTodoModal
        isOpen={showAddModal}
        onClose={closeModals}
        onAddTodo={addTodo}
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
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <p>Total Task : {countTodo} </p>
        <p>Completed : {storedCheckbox}</p>
        <p>Not Completed : {countTodo - storedCheckbox}</p>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Todo;
