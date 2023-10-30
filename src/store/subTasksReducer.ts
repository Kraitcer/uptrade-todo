import { Projects } from "../pages/ProjectsList";
import { v4 } from "uuid";
import { SubTasks } from "../pages/Tasks";

type Action =
  | {
      type: "ADD_SUBTASK";
      payload: { subTaskName: string; currentTaskID: string };
    }
  | { type: "EDIT_SUBTASK"; payload: { id: string; subTaskName: string } }
  | { type: "COMPLETE_SUBTASK"; payload: string }
  | { type: "DELETE_SUBTASK"; payload: string }
  | { type: "SET_SUBTASK"; payload: SubTasks[] };

export const projectsReducer = (
  state: SubTasks[] = [],
  action: Action
): SubTasks[] => {
  switch (action.type) {
    case "ADD_SUBTASK":
      return [
        {
          id: v4(),
          subTaskName: action.payload.subTaskName,
          currentTaskID: action.payload.currentTaskID,
          isEditing: false,
          complited: false,
        },
        ...state,
      ];

    case "EDIT_SUBTASK":
      return state.map((project) =>
        project.id === action.payload.id
          ? {
              ...project,
              isEditing: !project.isEditing,
              subTaskName: action.payload.subTaskName,
            }
          : project
      );

    case "COMPLETE_SUBTASK":
      return state.map((subTask) =>
        subTask.id === action.payload
          ? {
              ...subTask,
              complited: !subTask.complited,
            }
          : subTask
      );

    case "DELETE_SUBTASK":
      return state.filter((subTask) => subTask.id !== action.payload);
    case "SET_SUBTASK":
      return [...action.payload];
    default:
      return state;
  }
};
