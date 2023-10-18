import { Projects } from "../components/ProjectsList";
import { v4 } from "uuid";

type Action =
  | { type: "ADD_PROJECT"; payload: { task: string } }
  | { type: "EDIT_PROJECT"; payload: { id: string; task: string } }
  | { type: "COMPLETE_PROJECT"; payload: string }
  | { type: "DELETE_PROJECT"; payload: string };

export const projectsReducer = (
  state: Projects[] = [],
  action: Action
): Projects[] => {
  switch (action.type) {
    case "ADD_PROJECT":
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

    case "EDIT_PROJECT":
      return state.map((project) =>
        project.id === action.payload.id
          ? {
              ...project,
              isEditing: !project.isEditing,
              task: action.payload.task,
            }
          : project
      );

    case "COMPLETE_PROJECT":
      return state.map((project) =>
        project.id === action.payload
          ? {
              ...project,
              complited: !project.complited,
              active: !project.active,
            }
          : project
      );

    case "DELETE_PROJECT":
      return state.filter((project) => project.id !== action.payload);

    default:
      return state;
  }
};
