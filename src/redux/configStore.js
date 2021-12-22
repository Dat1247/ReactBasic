import { applyMiddleware, combineReducers, createStore } from "redux";
import { ToDoListReducer } from "./reducers/ToDoListReducer";
import LoadingReducer from "./reducers/LoadingReducer";
import { ModalReducer } from "./reducers/ModalReducer";
import reduxThunk from "redux-thunk";

//Middleware Saga
import createMiddlewareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";

const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
	//reducer khai báo tại đây
	ToDoListReducer,
	LoadingReducer,
	ModalReducer,
});

const store = createStore(
	rootReducer,
	applyMiddleware(reduxThunk, middlewareSaga)
);

//Gọi saga
middlewareSaga.run(rootSaga);

export default store;
