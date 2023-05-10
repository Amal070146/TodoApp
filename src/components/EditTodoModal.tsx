import React, { useState } from "react";
import "./todo.css";

interface EditTodoModalProps {
  isOpen: boolean;
  todoId: number;
  initialText: string;
  onClose: () => void;
  onUpdateTodo: (id: number, text: string) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  isOpen,
  todoId,
  initialText,
  onClose,
  onUpdateTodo,
}) => {
  const [updatedText, setUpdatedText] = useState(initialText);

  const updateTodo = () => {
    if (updatedText.trim()) {
      onUpdateTodo(todoId, updatedText.trim());
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content edit">
        <h2>Edit Todo</h2>
        <div>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            placeholder="Enter updated todo..."
          />
          <button onClick={updateTodo}>Update</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
