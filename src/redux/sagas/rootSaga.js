import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
import * as Cyberbugs from "./CyberBugs/UserCyberBugsSaga";
import * as ProjectCategorySaga from "./CyberBugs/ProjectCategorySaga";
import * as ProjectSaga from "./CyberBugs/ProjectSaga";
import * as TaskTypeSaga from "./CyberBugs/TaskTypeSaga";
import * as PrioritySaga from "./CyberBugs/PrioritySaga";
import * as TaskSaga from "./CyberBugs/TaskSaga";
import * as StatusSaga from "./CyberBugs/StatusSaga";

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
		Cyberbugs.theoDoiGetUser(),
		Cyberbugs.theoDoiAddUserProject(),
		Cyberbugs.theoDoiRemoveUserProject(),
		Cyberbugs.theoDoiGetUserByProjectIdSaga(),

		ProjectCategorySaga.theoDoigetAllProjetCategory(),
		ProjectSaga.theoDoiCreateProjectSaga(),
		ProjectSaga.theoDoiGetListProjectSaga(),
		ProjectSaga.theoDoiUpdateListProjectSaga(),
		ProjectSaga.theoDoiDeleteProjectSaga(),
		ProjectSaga.theoDoiGetProjectDetailSaga(),
		ProjectSaga.theoDoiGetAllProjectSaga(),

		TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),

		PrioritySaga.theoDoiGetAllPrioritySaga(),

		TaskSaga.theoDoiCreateTaskSaga(),
		TaskSaga.theoDoiGetTaskDetail(),
		TaskSaga.theoDoiUpdateTaskStatusSaga(),
		// TaskSaga.theoDoiUpdateTaskSaga(),
		TaskSaga.theoDoiHandleChangePostAPI(),

		StatusSaga.theoDoiGetAllStatus(),
	]);
}
