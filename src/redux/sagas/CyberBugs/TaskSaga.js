import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifyFunction } from "../../../util/Notification/NotificationCyberbugs";
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
		}

		yield put({ type: "CLOSE_DRAWER" });
		notifyFunction("success", "Create task successfully!", "");
	} catch (err) {
		console.log(err);
	}

	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiCreateTaskSaga() {
	yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}
