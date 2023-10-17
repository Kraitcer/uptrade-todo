import { Reducer } from "redux";
import { v4 as uuidv4 } from "uuid";

// Действия
enum ActionTypes {
  ADD_PROJECT = "ADD_PROJECT",
  EDIT_PROJECT = "EDIT_PROJECT",
  COMPLETE_PROJECT = "COMPLETE_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
}

// Интерфейс для состояния
interface ProjectsState {
  projects: Projects[];
}

// Интерфейс для проекта
interface Projects {
  id: string;
  task: string;
  isEditing: boolean;
  active: boolean;
  complited: boolean;
}

// Начальное состояние
const initialState: ProjectsState = {
  projects: [],
};

// Редьюсер
const projectsReducer: Reducer<ProjectsState, ProjectAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROJECT:
      const newProject: Projects = {
        id: uuidv4(),
        task: action.payload,
        isEditing: false,
        active: true,
        complited: false,
      };
      return {
        ...state,
        projects: [newProject, ...state.projects],
      };

    case ActionTypes.EDIT_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id
            ? {
                ...project,
                isEditing: !project.isEditing,
                task: action.payload.task,
              }
            : project
        ),
      };

    case ActionTypes.COMPLETE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload
            ? {
                ...project,
                complited: !project.complited,
                active: !project.active,
              }
            : project
        ),
      };

    case ActionTypes.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

// Действия
type ProjectAction =
  | { type: ActionTypes.ADD_PROJECT; payload: string }
  | { type: ActionTypes.EDIT_PROJECT; payload: { id: string; task: string } }
  | { type: ActionTypes.COMPLETE_PROJECT; payload: string }
  | { type: ActionTypes.DELETE_PROJECT; payload: string };

export default projectsReducer;
