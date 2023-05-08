import React, { useState } from "react";
import './todo.css'

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTodo: (text: string) => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = ({
  isOpen,
  onClose,
  onAddTodo,
}) => {
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo("");
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Todo</h2>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTodoModal;
