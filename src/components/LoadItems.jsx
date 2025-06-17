import { useContext } from "react";
import { TodoItemsContext } from "../store/TodoItemsContext";
import { useEffect } from "react";
import { useState } from "react";
import { todoItemToClientModel } from "../utils/ModelUtil";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoadItems = () => {
  const { todoItems, addAllTodoItems } = useContext(TodoItemsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/todos", {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((response) => {
        if (!response.success) {
          throw new Error(response.message || "Failed to load todos");
        }
        
        // If no todos, set empty array
       

        const newItems = response.todos.map(todoItemToClientModel);
        addAllTodoItems(newItems);
      })
      .catch((err) => {
        console.error("Error loading todo items:", err);
        toast.error("Error loading todo items. Please try again.");
        // Set empty array on error to prevent undefined
        addAllTodoItems([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
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
      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      {!isLoading && todoItems.length === 0 && (
        <p className="text-center text-gray-500 italic">Enjoy your day</p>
      )}
    </div>
  );
};

export default LoadItems;
