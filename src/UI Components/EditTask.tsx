import React, { useReducer } from "react";
import { tasksReducer } from "../store/tasksReducer";

interface Props {
  taskID: string;
}

const EditTask = ({ taskID }: Props) => {
  const [tasksStore, dispatch] = useReducer(tasksReducer, []);

  const currentTask = tasksStore.filter((task) => task.id === taskID);
  //   console.log("currentTask", tasksStore);

  return <div>EditTask</div>;
};

export default EditTask;
