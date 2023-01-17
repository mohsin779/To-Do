import { useState, useEffect } from "react";

import ActivityIndicator from "./components/ActivityIndicator";
import Center from "./components/Wrappers/Center";
import TodoDetails from "./views/TodoDetails";
import TodoForm from "./views/TodoForm";
import TodoList from "./views/TodoList";
import TodoSidebar from "./views/TodoSidebar";
import { useSelector } from "react-redux";

import useRefetchItems from "./hooks/useRefetchItems";
import LabelForm from "./views/LabelForm";

function App() {
  const query = useRefetchItems();

  const { selectedItem, showForm, labelForm, filteredItems } = useSelector(
    state => state.todo
  );

  useEffect(() => {
    if (showForm == false) query.refetch();
  }, [showForm, labelForm]);

  return (
    <main className="app-container">
      {labelForm ? <LabelForm /> : null}
      {showForm ? <TodoForm /> : null}
      <TodoSidebar />
      {query.isError ? (
        <Center>
          <h3>Something Went Wrong</h3>
        </Center>
      ) : query.isSuccess ? (
        filteredItems.length > 0 ? (
          <>
            <TodoList />

            {!selectedItem._id ? (
              <div className="details details-skeleton">
                <Center>
                  <h3>Select a todo item to see details</h3>
                </Center>
              </div>
            ) : (
              <TodoDetails />
            )}
          </>
        ) : (
          <Center>
            <h3>You dont have anything to do.</h3>
          </Center>
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
