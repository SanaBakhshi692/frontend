import { useContext, useRef } from "react";
import { TodoContext } from "./App";

export function TodoForm() {
  const nameRef = useRef();
  const { addTodo } = useContext(TodoContext);
  function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value === "") return;
    addTodo(nameRef.current.value);
    nameRef.current.value = "";
  }
  return (
    <>
      <form onSubmit={handleSubmit} id="new-todo-form">
        
        <div id="todo-header">
          <input type="text" id="todo-input" ref={nameRef} placeholder="Create a new todo"/>
        </div>
        <button className="btn">Add Todo</button>
      </form>
    </>
  );
}
