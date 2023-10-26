import { DateTime } from "luxon";
import { Tasks } from "../components/Tasks";

type TaskAction =
  | {
      type: "ADD_TASK";
      payload: {
        id: string;
        taskName: string;
        currentProjectID: string;
        description: string;
        status: "queue" | "development" | "done";
        creationDate: DateTime;
        timeSpent: string;
        dueDate?: DateTime;
      };
    }
  | { type: "DELETE_TASK"; payload: string }
  | {
      type: "EDIT_TASK";
      payload: {
        id: string;
        taskName: string;
        description: string;
        status: "queue" | "development" | "done";
        dueDate?: DateTime;
      };
    }
  // | { type: "COMPLETE_TASK"; payload: string }
  | { type: "SET_TASKS"; payload: Tasks[] };

export const tasksReducer = (
  state: Tasks[] = [],
  action: TaskAction
): Tasks[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: action.payload.id,
          taskName: action.payload.taskName,
          currentProjectID: action.payload.currentProjectID,
          status: action.payload.status,
          description: action.payload.description,
          creationDate: action.payload.creationDate,
          timeSpent: action.payload.timeSpent,
          dueDate: action.payload.dueDate,
        },
      ];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              taskName: action.payload.taskName,
              status: action.payload.status,
              description: action.payload.description,
              dueDate: action.payload.dueDate,
            }
          : task
      );
    case "SET_TASKS":
      return [...action.payload];
    default:
      return state;
  }
};
