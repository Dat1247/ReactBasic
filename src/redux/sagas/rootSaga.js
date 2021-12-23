import Axios from "axios";
import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
import * as Cyberbugs from "./CyberBugs/UserCyberBugsSaga";

export function* rootSaga() {
	// yield fork(getTaskAPI);
	// yield takeEvery("getTaskAPIAction", getTaskAPI);

	yield all([
		//Nghiệp vụ theo dõi các action saga To do list
		ToDoListSaga.theoDoiActionGetTaskAPI(),
		ToDoListSaga.theoDoiActionAddTaskAPI(),
		ToDoListSaga.theoDoiActionDeleteTaskAPI(),
		ToDoListSaga.theoDoiActionDoneTaskAPI(),
		ToDoListSaga.theoDoiActionRejectTaskAPI(),

		//CyberBugs
		Cyberbugs.theoDoiSignin(),
	]);
}
