import { combineReducers } from "redux";
import ToDoListReducer from "./ToDoListReducer";
import { FakebookReducer } from "./FakebookReducer";
import BTGameBauCuaReducer from "./BTGameBauCuaReducer";

export const rootReducer = combineReducers({
	ToDoListReducer,
	FakebookReducer,
	BTGameBauCuaReducer,
});
