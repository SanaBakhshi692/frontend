import { useContext, useRef, useState } from "react";
import { TodoContext } from "./App";
import bin from "./assets/images/bin.png";
import edit from "./assets/images/Edit.png";
import Tik from "./assets/images/Tik.png";

export function TodoItem({ id, name, complete }) {
  const { toggleTodo, deleteTodo, updateTodoName } = useContext(TodoContext);

  const [isEditing, setIsEditing] = useState(false);

  const nameRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value === "") return;
    updateTodoName(id, nameRef.current.value);
    setIsEditing(false);
  }
  return (
    <>
      <li className="list-item" key={id}>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              defaultValue={name}
              ref={nameRef}
              autoFocus
              data-list-item-Edit
            />
            <button data-button-save>
              <img src={Tik} />
            </button>
          </form>
        ) : (
          <>
            <input
              type="checkbox"
              checked={complete}
              onChange={(e) => toggleTodo(id, e.target.checked)}
              data-list-item-checkbox
            />

            <p data-list-item-text>{name}</p>
            <div>
              <button data-button-edit onClick={() => setIsEditing(true)}>
                <img src={edit} />
              </button>
              <button data-button-delete onClick={() => deleteTodo(id)}>
                <img src={bin} />
              </button>
            </div>
          </>
        )}
      </li>
    </>
  );
}

export default TodoItem;
