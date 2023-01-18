import { useReducer } from "react";

export const TodoContext = createContext();

const initialState = { items: [] };

const todoReducer = (state, action) => {
  switch (action.type) {
    case "LIGHTMODE":
      return { darkMode: false };
    case "DARKMODE":
      return { darkMode: true };
    default:
      return state;
  }
};

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.TodoProvider value={{ state: state, dispatch: dispatch }}>
      {children}
    </TodoContext.TodoProvider>
  );
}
