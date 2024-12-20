import React from "react";
import { useQueryHandler } from "./hooks/useQueryHandler";
import {
  useAddTodo,
  useDeleteTodo,
  useEditTodo,
} from "./hooks/useQueryHandler/useQueryActions";
import { Button } from "antd";

const App = () => {
  const { data, isLoading, isError } = useQueryHandler({
    pathname: "TODO",
    url: "info",
  });

  const { mutate, isLoading: Loading } = useAddTodo();
  const deleteTodo = useDeleteTodo();
  const editTodo = useEditTodo()
  return (
    <div className="w-[400px] mx-auto">
      {isLoading || Loading
        ? "Loading..."
        : data?.map((value) => (
            <div
              key={value.id}
              className="flex items-center justify-between bg-slate-500 pt-5 mt-5"
            >
              <p>{value.name}</p>
              <Button onClick={() => deleteTodo(value)}>Delete</Button>
              <Button onClick={()=> editTodo({...value, text: "salom"})}>Edit</Button>
            </div>
          ))}
      <Button
        onClick={() =>
          mutate({
            text: "text has been changed",
            ID: Date.now(),
            date: new Date(),
          })
        }
      >
        Add
      </Button>
    </div>
  );
};

export default App;
