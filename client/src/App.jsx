import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import todoApi from "./api/todo";
import ActivityIndicator from "./components/ActivityIndicator";
import Center from "./components/Wrappers/Center";
// import { TodoContext } from "./context/todoContext";
import TodoDetails from "./views/TodoDetails";
import TodoForm from "./views/TodoForm";
import TodoList from "./views/TodoList";
import TodoSidebar from "./views/TodoSidebar";

function App() {
  const query = useQuery("getTojadoiahodiaodo", () => todoApi.getTodos());

  const [selectedTodo, setSelectedTodo] = useState(null);

  const [showAddTodo, setShowAddTodo] = useState(false);

  return (
    <main className="app-container">
      {showAddTodo ? <TodoForm setShowAddTodo={setShowAddTodo} /> : null}
      <TodoSidebar setShowAddTodo={setShowAddTodo} />
      {query.isError ? (
        <Center>
          <h3>Something Went Wrong</h3>
        </Center>
      ) : query.isSuccess ? (
        query.data.length > 0 ? (
          <>
            <TodoList
              selected={selectedTodo}
              setSelected={setSelectedTodo}
              items={query.data}
            />

            {selectedTodo === null ? (
              <div className="details details-skeleton">
                <Center>
                  <h3>Select a todo item to see details</h3>
                </Center>
              </div>
            ) : (
              <TodoDetails id={selectedTodo} />
            )}
          </>
        ) : (
          <div className="details details-skeleton">
            <Center>
              <h3>You dont have anything to do.</h3>
            </Center>
          </div>
        )
      ) : (
        <Center>
          <ActivityIndicator></ActivityIndicator>
        </Center>
      )}
    </main>
  );
}

export default App;
