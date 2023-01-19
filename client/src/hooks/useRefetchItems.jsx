import { useQuery } from "react-query";
import todoApi from "../api/todo";
import { useDispatch } from "react-redux";
import { actions } from "../stores";

function useRefetchItems(label = null) {
  const { setItems } = actions;
  const dispatch = useDispatch();
  const query = useQuery("GET_ALL_TODO_ITEMS", () => todoApi.getTodos(label), {
    onSuccess: data => {
      dispatch(setItems(data));
    },
  });

  return query;
}

export default useRefetchItems;
