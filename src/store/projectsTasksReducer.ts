import { Projects } from "../components/ProjectsList";
import { Tasks } from "../components/ProjectsTasks";
import { v4 } from "uuid";

type TaskAction =
  | {
      type: "ADD_TASK";
      payload: {
        taskName: string;
        currentProjectID: string;
        status: "queue" | "development" | "done";
      };
    }
  | { type: "DELETE_TASK"; payload: string };
// | { type: "EDIT_TASK"; payload: { id: string; taskName: string } }
// | { type: "COMPLETE_TASK"; payload: string }
// | { type: "SET_TASK"; payload: Projects[] };

export const projectsReducer = (
  state: Tasks[] = [],
  action: TaskAction
): Tasks[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        {
          id: v4(),
          taskName: action.payload.taskName,
          currentProjectID: action.payload.currentProjectID,
          status: action.payload.status,
        },
        ...state,
      ];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    // case "EDIT_TASK":
    //   return state.map((task) =>
    //     task.id === action.payload.id
    //       ? {
    //           ...task,
    //           isEditing: !project.isEditing,
    //           task: action.payload.task,
    //         }
    //       : project
    //   );

    // case "COMPLETE_TASK":
    //   return state.map((project) =>
    //     project.id === action.payload
    //       ? {
    //           ...project,
    //           complited: !project.complited,
    //           active: !project.active,
    //         }
    //       : project
    //   );
    // case "SET_TASK":
    //   return [...action.payload];
    default:
      return state;
  }
};
