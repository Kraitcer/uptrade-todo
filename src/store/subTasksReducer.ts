import { Projects } from "../pages/ProjectsList";
import { v4 } from "uuid";

type Action =
  | { type: "ADD_SUBTASK"; payload: { task: string } }
  | { type: "EDIT_SUBTASK"; payload: { id: string; task: string } }
  | { type: "COMPLETE_SUBTASK"; payload: string }
  | { type: "DELETE_SUBTASK"; payload: string }
  | { type: "SET_SUBTASK"; payload: Projects[] };

export const projectsReducer = (
  state: Projects[] = [],
  action: Action
): Projects[] => {
  switch (action.type) {
    case "ADD_SUBTASK":
      return [
        {
          id: v4(),
          task: action.payload.task,
          isEditing: false,
          active: true,
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
              task: action.payload.task,
            }
          : project
      );

    case "COMPLETE_SUBTASK":
      return state.map((project) =>
        project.id === action.payload
          ? {
              ...project,
              complited: !project.complited,
              active: !project.active,
            }
          : project
      );

    case "DELETE_SUBTASK":
      return state.filter((project) => project.id !== action.payload);
    case "SET_SUBTASK":
      return [...action.payload];
    default:
      return state;
  }
};
