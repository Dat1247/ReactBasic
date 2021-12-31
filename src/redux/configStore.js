import { applyMiddleware, combineReducers, createStore } from "redux";
import { ToDoListReducer } from "./reducers/ToDoListReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import { ModalReducer } from "./reducers/ModalReducer";
import reduxThunk from "redux-thunk";
import { HistoryReducer } from "./reducers/HIstoryReducer";
import { UserLoginCyberBugsReducer } from "./reducers/UserCyberBugsReducer";
import { ProjectCyberbugsReducer } from "./reducers/ProjectCyberbugsReducer";
import { ProjectListCyberbugsReducer } from "./reducers/ProjectListCyberbugsReducer";
import DrawerCyberbugsReducer from "./reducers/DrawerCyberbugsReducer";

//Middleware Saga
import createMiddlewareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import { ProjectReducer } from "./reducers/ProjectReducer";
import { TaskTypeReducer } from "./reducers/TaskTypeReducer";
import { PriorityReducer } from "./reducers/PriorityReducer";
import { StatusReducer } from "./reducers/StatusReducer";

const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
	//reducer khai báo tại đây
	ToDoListReducer,
	LoadingReducer,
	ModalReducer,
	HistoryReducer,
	UserLoginCyberBugsReducer,
	ProjectCyberbugsReducer,
	ProjectListCyberbugsReducer,
	DrawerCyberbugsReducer,
	ProjectReducer,
	TaskTypeReducer,
	PriorityReducer,
	StatusReducer,
});

const store = createStore(
	rootReducer,
	applyMiddleware(reduxThunk, middlewareSaga)
);

//Gọi saga
middlewareSaga.run(rootSaga);

export default store;
