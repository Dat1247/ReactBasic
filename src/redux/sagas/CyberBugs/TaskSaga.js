import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifyFunction } from "../../../util/Notification/NotificationCyberbugs";
import {
	CHANGE_ASSIGNEES,
	CHANGE_TASK_MODAL,
	CREATE_TASK_SAGA,
	GET_PROJECT_DETAIL_SAGA,
	GET_TASK_DETAIL,
	GET_TASK_DETAIL_SAGA,
	HANDLE_CHANGE_POST_API_SAGA,
	REMOVE_USER_ASSIGN,
	UPDATE_STATUS_TASK_SAGA,
	UPDATE_TASK_SAGA,
} from "../../constants/CyberBugs/CyberBugsConstants";
import { CLOSE_DRAWER } from "../../constants/CyberBugs/DrawerConstants";
import {
	DISPLAY_LOADING,
	HIDE_LOADING,
} from "../../constants/LoadingConstants";

function* createTaskSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(500);

	try {
		const { data, status } = yield call(() =>
			taskService.createTask(action.taskObject)
		);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({ type: CLOSE_DRAWER });
			notifyFunction("success", "Create task successfully!", "");
		}
	} catch (err) {
		console.log(err);
	}

	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiCreateTaskSaga() {
	yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

//-------------------------- GET TASK DETAIL --------------------------------------
function* getTaskDetail(action) {
	const { taskId } = action;
	try {
		const { data, status } = yield call(() =>
			taskService.getTaskDetail(taskId)
		);

		yield put({
			type: GET_TASK_DETAIL,
			taskDetailModal: data.content,
		});
	} catch (err) {
		console.log(err.response?.data);
	}
}

export function* theoDoiGetTaskDetail() {
	yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail);
}

//-------------------------- UPDATE TASK STATUS --------------------------------------
function* updateTaskStatusSaga(action) {
	const { taskStatusUpdate } = action;
	try {
		const { data, status } = yield call(() =>
			taskService.updateStatusTask(taskStatusUpdate)
		);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_PROJECT_DETAIL_SAGA,
				// taskId: taskStatusUpdate.taskId,
				projectId: taskStatusUpdate.projectId,
			});
			yield put({
				type: GET_TASK_DETAIL_SAGA,
				taskId: taskStatusUpdate.taskId,
			});
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiUpdateTaskStatusSaga() {
	yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

//-------------------------- UPDATE TASK SAGA --------------------------------------
// function* updateTaskSaga(action) {
// 	const { taskUpdate } = action;
// 	try {
// 		const { data, status } = yield call(() =>
// 			taskService.updateTask(taskUpdate)
// 		);

// 		if (status === STATUS_CODE.SUCCESS) {
// 		}
// 	} catch (err) {
// 		console.log(err.response?.data);
// 	}
// }

// export function* theoDoiUpdateTaskSaga() {
// 	yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
// }

export function* handleChangePostAPI(action) {
	//Gọi action làm thay đổi task detail modal
	switch (action.actionType) {
		case CHANGE_TASK_MODAL:
			{
				const { value, name } = action;
				yield put({
					type: CHANGE_TASK_MODAL,
					name,
					value,
				});
			}
			break;
		case CHANGE_ASSIGNEES:
			{
				const { userSelect } = action;
				yield put({
					type: CHANGE_ASSIGNEES,
					userSelect,
				});
			}
			break;

		case REMOVE_USER_ASSIGN:
			{
				yield put({
					type: REMOVE_USER_ASSIGN,
					userId: action.userId,
				});
			}
			break;
	}

	//Save lại qua API updateTaskSaga
	let { taskDetailModal } = yield select((state) => state.TaskReducer);
	let listUserAsign = taskDetailModal.assigness?.map((user, index) => {
		return user.id;
	});
	const taskUpdateAPI = { ...taskDetailModal, listUserAsign };

	try {
		const { data, status } = yield call(() =>
			taskService.updateTask(taskUpdateAPI)
		);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_PROJECT_DETAIL_SAGA,
				// taskId: taskStatusUpdate.taskId,
				projectId: taskUpdateAPI.projectId,
			});
			yield put({
				type: GET_TASK_DETAIL_SAGA,
				taskId: taskUpdateAPI.taskId,
			});
		}
	} catch (err) {
		console.log(err.response?.data);
	}
}

export function* theoDoiHandleChangePostAPI() {
	yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostAPI);
}
