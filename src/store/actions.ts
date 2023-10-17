// actions.ts

import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";

// Действия
export enum ActionTypes {
  ADD_PROJECT = "ADD_PROJECT",
  EDIT_PROJECT = "EDIT_PROJECT",
  COMPLETE_PROJECT = "COMPLETE_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
}

// Интерфейс для проекта
interface Projects {
  id: string;
  task: string;
}

// Действия
interface AddProjectAction {
  type: ActionTypes.ADD_PROJECT;
  payload: Projects;
}

interface EditProjectAction {
  type: ActionTypes.EDIT_PROJECT;
  payload: Projects;
}

interface CompleteProjectAction {
  type: ActionTypes.COMPLETE_PROJECT;
  payload: string;
}

interface DeleteProjectAction {
  type: ActionTypes.DELETE_PROJECT;
  payload: string;
}

// Создание действий
export const addProject = (task: string) => (dispatch: Dispatch) => {
  const newProject: Projects = {
    id: uuidv4(),
    task,
  };
  dispatch({
    type: ActionTypes.ADD_PROJECT,
    payload: newProject,
  });
};

export const editProject =
  (id: string, task: string) => (dispatch: Dispatch) => {
    const updatedProject: Projects = {
      id,
      task,
    };
    dispatch({
      type: ActionTypes.EDIT_PROJECT,
      payload: updatedProject,
    });
  };

export const completeProject = (id: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.COMPLETE_PROJECT,
    payload: id,
  });
};

export const deleteProject = (id: string) => (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.DELETE_PROJECT,
    payload: id,
  });
};

// Другие действия могут быть добавлены сюда при необходимости
