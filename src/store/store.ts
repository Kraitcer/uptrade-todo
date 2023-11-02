// Импортируйте compose из Redux
import { createStore, combineReducers, compose } from "redux";
import { projectsReducer } from "./projectsReducer";
import { tasksReducer } from "./tasksReducer";
import { subTasksReducer } from "./subTasksReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof import("redux").compose;
  }
}
// Корневой редьюсер, если у вас больше одного редьюсера
const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  subTasks: subTasksReducer,
  // другие редьюсеры могут быть добавлены сюда
});

// Подключение к расширению Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Создание Redux store с поддержкой Redux DevTools
const store = createStore(rootReducer, composeEnhancers());

export default store;
