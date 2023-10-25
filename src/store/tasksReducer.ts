import { Tasks } from "../components/ProjectsTasks";

type TaskAction =
  | {
      type: "ADD_TASK";
      payload: {
        id: string;
        taskName: string;
        currentProjectID: string;
        description: string;
        status: "queue" | "development" | "done";
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
            }
          : task
      );

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
    case "SET_TASKS":
      return [...action.payload];
    default:
      return state;
  }
};
