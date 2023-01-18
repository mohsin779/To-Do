import { useEffect } from "react";

import ActivityIndicator from "./components/ActivityIndicator";
import Center from "./components/Wrappers/Center";
import {
  LabelForm,
  TodoDetails,
  TodoForm,
  TodoList,
  TodoSidebar,
} from "./views";

import useRefetchItems from "./hooks/useRefetchItems";
import { useSelector } from "react-redux";

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
