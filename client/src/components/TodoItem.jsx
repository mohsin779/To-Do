import React from "react";

import TodoDescription from "./TodoDescription";
import TodoFooter from "./TodoFooter";
import TodoHeader from "./TodoHeader";

const TodoItem = ({ todo, selected }) => {
  // const [status, setStatus] = useState(todo.status);

  // const mutation = useMutation({
  //   mutationFn: () =>
  //     todoApi.changeStatus({ ...todo, id: todo._id, status: status }),
  //   onSuccess: data => {
  //     console.log(data);
  //   },
  // });

  return (
    <div>
      <div className={`todo-item ${selected ? "todo-item-active" : ""}`}>
        <TodoHeader id={todo._id} title={todo.title} />
        <TodoDescription description={todo.description} />
        <TodoFooter
          // onChangeStatus={() => {
          //   setStatus(state => !state);

          //   mutation.mutate();
          // }}
          // status={status}
          item={todo}
        />
      </div>
    </div>
  );
};

export default TodoItem;
