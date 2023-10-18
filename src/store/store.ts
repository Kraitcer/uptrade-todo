import { createStore, combineReducers } from "redux";
import { projectsReducer } from "./projectsReducer";
// Подставьте правильный путь к вашему редьюсеру

// Корневой редьюсер, если у вас больше одного редьюсера
const rootReducer = combineReducers({
  projects: projectsReducer,
  // другие редьюсеры могут быть добавлены сюда
});

// Создание Redux store
const store = createStore(rootReducer);

export default store;
