import Axios from "axios";
import {
	call,
	delay,
	fork,
	put,
	take,
	takeEvery,
	takeLatest,
} from "redux-saga/effects";
import {
	ADD_TASK_API,
	CHECK_TASK_API,
	DELETE_TASK_API,
	GET_TASKLIST_API,
	GET_TASK_API,
	REJECT_TASK_API,
} from "../constants/ToDoListConstant";
import { toDoListService } from "../../services/ToDoListService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstants";

/**
 * Redux chia làm 2 loại action:
 * Loại 1: action => object (action thường)
 * Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)
 */

/**
 * 20/12/2021 - Chức năng getTask
 * Action saga lấy danh sách task từ API
 */
function* getTaskAPI(action) {
	// while (true) {
	// 	yield take("getTaskAPIAction"); //Theo dõi action -> xem action nào dispatch mới làm công việc bên dưới
	// 	console.log("abc");
	// 	//call api dispatch lên reducer

	// }

	// yield delay(3000);
	// console.log("actionsaga", action);

	yield put({
		type: DISPLAY_LOADING,
	});
	try {
		let { data, status } = yield call(toDoListService.getTaskAPI);
		yield delay(500);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_TASK_API,
				taskList: data,
			});
		} else {
			console.log("Error");
		}
	} catch (err) {
		console.log(err);
	}
	yield put({
		type: HIDE_LOADING,
	});
	//Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
}

export function* theoDoiActionGetTaskAPI() {
	yield takeLatest(GET_TASKLIST_API, getTaskAPI);
}

/**
 * 20/12/2021 - Chức năng addTask
 * Action saga add task từ API
 */

function* addTaskAPIAction(action) {
	const { taskName } = action;
	//Gọi API
	try {
		const { data, status } = yield call(() => {
			return toDoListService.addTaskAPI(taskName);
		});
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_TASKLIST_API,
			});
		}
	} catch (error) {
		console.log(error);
	}
	//HIển thị Loading
	// Thành công gọi lại task list
}

export function* theoDoiActionAddTaskAPI() {
	yield takeLatest(ADD_TASK_API, addTaskAPIAction);
}

/**
 * 20/12/2021 - Chức năng delete task`
 * Action saga delete task từ API
 */

function* deleteTaskAPI(action) {
	const { taskName } = action;
	try {
		const { data, status } = yield call(() => {
			return toDoListService.deleteTaskAPI(taskName);
		});

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_TASKLIST_API,
			});
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiActionDeleteTaskAPI() {
	yield takeLatest(DELETE_TASK_API, deleteTaskAPI);
}

/**
 * 20/12/2021 - Chức năng done task`
 * Action saga done task từ API
 */

function* doneTaskAPI(action) {
	const { taskName } = action;
	try {
		const { data, status } = yield call(() => {
			return toDoListService.doneTaskAPI(taskName);
		});
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_TASKLIST_API,
			});
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiActionDoneTaskAPI() {
	yield takeLatest(CHECK_TASK_API, doneTaskAPI);
}

/**
 * 20/12/2021 - Chức năng reject task`
 * Action saga reject task từ API
 */

function* rejectTaskAPI(action) {
	const { taskName } = action;
	try {
		const { data, status } = yield call(() => {
			return toDoListService.rejectTaskAPI(taskName);
		});
		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_TASKLIST_API,
			});
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiActionRejectTaskAPI() {
	yield takeLatest(REJECT_TASK_API, rejectTaskAPI);
}
