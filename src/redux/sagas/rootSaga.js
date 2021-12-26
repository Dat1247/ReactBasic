import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
import * as Cyberbugs from "./CyberBugs/UserCyberBugsSaga";
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/ProjectSaga";

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
		ProjectCategorySaga.theoDoigetAllProjetCategory(),
		ProjectSaga.theoDoiCreateProjectSaga(),
	]);
}
