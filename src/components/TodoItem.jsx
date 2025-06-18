import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";
import Button from "./Button";
import {useContext, useState} from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const TodoItem = ({ id, todoText, todoDate, completed }) => {

  const {deleteTodoItem} = useContext(TodoItemsContext);
  const [isComplete, setIsComplete] = useState(completed);

  const formattedDate = new Date(todoDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const toggleComplete = () => {
    fetch(`https://todo-app-backend-95cy.onrender.com/todos/${id}`, {
      method: 'PATCH',    
      credentials: 'include',  
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({completed: !isComplete})
    })
    .then(res => res.json())
    .then(updatedItem => {
      if(!updatedItem.success) {
        throw new Error(updatedItem.message || "Failed to update todo");
      }
      console.log('updatedItem', updatedItem);
      const clientUpdatedItem = todoItemToClientModel(updatedItem.updatedItem);
      setIsComplete(clientUpdatedItem.completed);
    })
    .catch(err => {
      toast.error("Error updating todo item. Please try again.");
      console.log(err);
    })
  }

  const deleteHandler = () => {
    fetch(`https://todo-app-backend-95cy.onrender.com/todos/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(res =>
      {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.message || "Failed to delete todo");
          });
        }
        return res.json();
      })
    .then(deletedItem => {
      if(!deletedItem.success) {
        throw new Error(deletedItem.message || "Failed to delete todo");
      }
      console.log('deletedItem', deletedItem);
      const clientDeletedItem = todoItemToClientModel(deletedItem.deletedItem
);
      deleteTodoItem(clientDeletedItem.id);
    })
    .catch(err => {
      toast.error("Error deleting todo item. Please try again.");
      console.log(err);
    })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mb-4">
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
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <input type="checkbox"
          checked={isComplete}
          onChange={toggleComplete}
          className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"/>

          <div className={`flex-1 ${isComplete ? 'line-through text-gray-500' : ''}`}>
            <p className="text-gray-800 font-medium">{todoText}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
          <div>
            <Button btnType="danger" btnText="Delete" handler={deleteHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
