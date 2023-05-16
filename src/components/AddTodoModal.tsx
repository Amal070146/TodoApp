import React, { useState } from "react";
import './todo.css'
import axios from 'axios'

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

  // const addTodo = () => {
  //   if (newTodo.trim()) {
  //     onAddTodo(newTodo.trim());
  //     setNewTodo("");
  //     onClose();
  //   }
  // };

  if (!isOpen) {
    return null;
  }

  const addtodo = ()=>{
    const storedAccess = localStorage.getItem("access");
    console.log(storedAccess)
axios
  .post(
    "https://mulearn-internship-task-production.up.railway.app/api/todo/",
    { title: newTodo },
    {
      headers: { Authorization: `Bearer ${storedAccess}`}
      
    }
  )
  .then((response) => console.log(response));}

  return (
    <div className="modal">
      <div className="modal-content">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo..."
        />
        <button onClick={addtodo}>Add</button>
        
      </div>
    </div>
  );
};

export default AddTodoModal;
