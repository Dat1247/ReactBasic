import { combineReducers } from "redux";
import ToDoListReducer from "./ToDoListReducer";
import { FakebookReducer } from "./FakebookReducer";

export const rootReducer = combineReducers({
	ToDoListReducer,
	FakebookReducer,
});
