import React, {useState} from "react";
import "./App.css";
const App3 = () => {
    const [todos, setTodos] = useState([]);
    const [todoEditing, setTodoEditing] = useState([]);
  
  
  // Add the handlesubmit code here
  function handleSubmit(e)
  {
    e.preventDefault();

    let todo = document.getElementById('todoAdd').value;
    const newTodo =
    {
        id: new Date().getTime(),
        text: todo.trim(),
        completed: false,
    }

    if(newTodo.text.length > 0)
    {
        setTodos([...todos].concat(newTodo));
    }
    else
    {
        alert("Enter valid task");
    }

    document.getElementById('todoAdd').value = ""
  }  
  
  // Add the deleteToDo code here
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  
  // Add the toggleComplete code here
  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => 
    {
      if (todo.id === id) 
      {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  // Add the submitEdits code here
  function submitEdits(editedTodo)
  {
      let updatedTodos = [...todos].map((todo) =>
      {
        if(todo.id === editedTodo.id)
        {
            // This was the old text apparently, and not the newly edited text
            //todo.text = editedTodo.text;
            todo.text = document.getElementById(editedTodo.id).value;
            return todo;
        }
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
  }
// function submitEdits(newtodo) {
//     const updatedTodos = [...todos].map((todo) => {
//       if (todo.id === newtodo.id) {
//         todo.text = document.getElementById(newtodo.id).value;
//         }
//         return todo;
//       });
//       setTodos(updatedTodos);
//       setTodoEditing(null);
//     }


return(
<div id="todo-list">
    <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
        <input type="text" id = 'todoAdd' />
        <button type="submit">Add Todo</button>
    </form>
    {todos.map((todo) =>
        <div className="todo" key={todo.id}>
            <div className="todo-text">
                {/* Add checkbox for toggle complete */}
                <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>
                {/* If editing, show a text box, else show a label. */}
                {todo.id === todoEditing ?
                    (<input type="text" id={todo.id} defaultValue={todo.text} />) : 
                    
                    (
                        
                        <div>{todo.text}</div>
                    )
                }
                {/* cant have just {todo.text}... had to be in a div element */}
            </div>
            <div className="todo-actions>">
                {todo.id === todoEditing ?
                    ( <button onClick={() => submitEdits(todo)}>Submit Edits</button> ) :
                    ( <button onClick={() => setTodoEditing(todo.id)}>Edit</button>)
                }
                {/* insert delete button below this line */}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
        </div>)}
    </div>
);
};
export default App3;
