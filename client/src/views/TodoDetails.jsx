import React, { useEffect } from "react";
import { useQuery } from "react-query";
import todoApi from "../api/todo";
import TodoDescription from "../components/TodoDescription";
import TodoFooter from "../components/TodoFooter";
import TodoHeader from "../components/TodoHeader";

const TodoDetails = ({ id }) => {
  const { data, isSuccess, isLoading, refetch } = useQuery(
    "get_Single_Todo_Item_By_Id",
    () => {
      console.log(id);
      return todoApi.getTodo(id);
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <section className="details">
      {isSuccess ? (
        <>
          <TodoHeader title={data.title} />
          <div className="img-container">
            {data.image ? <img src={data.image} /> : null}
          </div>
          <TodoDescription
            description={data.description}
            style={{
              textOverflow: "unset",
              whiteSpace: "normal",
              flex: 1,
              overflowY: "scroll",
            }}
          />
          {/* <TodoFooter
            status={data.status}
            changeStatus={() => {
              console.log("first");
            }}
          /> */}
        </>
      ) : (
        "asd"
      )}
    </section>
  );
};

export default TodoDetails;
