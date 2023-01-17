import React from "react";

import TodoDescription from "./TodoDescription";
import TodoFooter from "./TodoFooter";
import TodoHeader from "./TodoHeader";

import { useSelector, useDispatch } from "react-redux";

const TodoItem = ({ todo, selected }) => {
  // const [status, setStatus] = useState(todo.status);

  // const mutation = useMutation({
  //   mutationFn: () =>
  //     todoApi.changeStatus({ ...todo, id: todo._id, status: status }),
  //   onSuccess: data => {
  //     console.log(data);
  //   },
  // });

  const selectedItem = useSelector(state => state.todo.selectedItem);

  return (
    <div>
      <div
        className={`todo-item ${
          selectedItem._id === todo._id ? "todo-item-active" : ""
        }`}
      >
        <TodoHeader item={todo} />
        <TodoDescription description={todo.description} />
        <TodoFooter item={todo} />
      </div>
    </div>
  );
};

export default TodoItem;
