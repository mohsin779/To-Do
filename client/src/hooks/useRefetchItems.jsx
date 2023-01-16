import { useQuery } from "react-query";
import todoApi from "../api/todo";
import { useDispatch } from "react-redux";
import { setItems } from "../stores/Todo/todoSlice";

function useRefetchItems() {
  const dispatch = useDispatch();
  const query = useQuery("getTojadoiahodiaodo", () => todoApi.getTodos(), {
    onSuccess: data => {
      dispatch(setItems(data));
    },
  });

  return query;
}

export default useRefetchItems;
