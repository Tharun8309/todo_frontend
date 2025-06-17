import { toast } from "react-toastify";
import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";
import Button from "./Button";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRef, useContext} from "react";

const AddTodo = () => {
  const todoTextInput = useRef();
  const todoDateInput = useRef();
  const {addTodoItem} = useContext(TodoItemsContext);

  const addHandler = () => {
    const todoText = todoTextInput.current.value.trim();
    const todoDate = todoDateInput.current.value;

    // Validate inputs
    if (!todoText) {
      toast.error("Please enter a todo item");
      return;
    }
    if (!todoDate) {
      toast.error("Please select a date");
      return;
    }

    // Clear inputs
    todoTextInput.current.value = '';
    todoDateInput.current.value = '';

    // Send request
    fetch("https://todo-app-backend-95cy.onrender.com/todos", {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: todoText,
        date: todoDate
      })
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          throw new Error(err.message || "Failed to add todo");
        });
      }
      return res.json();
    })
    .then(response => {
      if (!response.success) {
        throw new Error(response.message || "Failed to add todo");
      }
      
      // Convert the response to the client model format
      const clientTodo = todoItemToClientModel(response);
      addTodoItem(clientTodo.id, clientTodo.todoText, clientTodo.todoDate);
      toast.success("Todo item added successfully!");
    })
    .catch(err => {
      toast.error(err.message || "Error adding todo item. Please try again.");
      console.error("Error adding todo item:", err);
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mb-8 mt-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Todo Here"
          ref={todoTextInput}
        />
        <input 
          type="date" 
          ref={todoDateInput} 
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="w-full sm:w-auto">
          <Button btnType="success" btnText="Add" handler={addHandler}/>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
