import { createContext, useEffect, useReducer, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoFilterForm } from "./TodoFilterForm";
import { TodoList } from "./TodoList";

const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  UPDATE_TODO: "update-todo",
};

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_TODO:
      return [
        ...todos,
        {
          name: payload.name,
          complete: false,
          id: crypto.randomUUID(),
        },
      ];

    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id == payload.id)
          return { ...todo, complete: payload.complete };
        return todo;
      });

    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== payload.id);

    case ACTIONS.UPDATE_TODO:
      return todos.map((todo) => {
        if (todo.id === payload.id) return { ...todo, name: payload.name };
        return todo;
      });

    default:
      throw new Error("no action found");
  }
}

export const TodoContext = createContext();

function App() {
  const LOCAL_STORAGE_KEY = "TODOS";

  const [filteredName, setFilteredName] = useState("");
  const [unCompleteFilter, setUnCompleteFilter] = useState(false);
  const [CompletedFilter, setCompletedFilter] = useState(false);

  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const localValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (localValue == null) return initialValue;
    return JSON.parse(localValue);
  });

  const filteredTodo = todos.filter((todo) => {
    if (unCompleteFilter && todo.complete) return false;
    if (CompletedFilter && !todo.complete) return false;
    if (todo.name.includes(filteredName)) return { ...todo };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(name) {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name } });
  }

  function toggleTodo(todoId, complete) {
    dispatch({
      type: ACTIONS.TOGGLE_TODO,
      payload: { id: todoId, complete },
    });
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todoId } });
  }

  function updateTodoName(id, name) {
    dispatch({ type: ACTIONS.UPDATE_TODO, payload: { id, name } });
  }

  return (
    <>
      <div className="todo-app">
        <ul id="menu">
          <h1 id="todo-label">Todo App</h1>
          <TodoFilterForm
            name={filteredName}
            setName={setFilteredName}
            unCompleted={unCompleteFilter}
            setUncompleted={setUnCompleteFilter}
            Completed={CompletedFilter}
            setCompleted={setCompletedFilter}
          />
        </ul>
        <TodoContext.Provider
          value={{
            todos: filteredTodo,
            addTodo,
            toggleTodo,
            deleteTodo,
            updateTodoName,
          }}
        >
          <TodoForm />
          <TodoList />
        </TodoContext.Provider>
      </div>
    </>
  );
}

export default App;
