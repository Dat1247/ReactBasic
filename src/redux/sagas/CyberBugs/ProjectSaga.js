import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
	CREATE_PROJECT_SAGA,
	DELETE_PROJECT_SAGA,
	GET_ALL_PROJECT,
	GET_ALL_PROJECT_SAGA,
	GET_LIST_PROJECT_SAGA,
	GET_PROJECT_DETAIL_SAGA,
	GET_PROJECT_LIST,
	GET_USER_BY_PROJECT_ID_SAGA,
	PUT_PROJECT_DETAIL,
	UPDATE_LIST_PROJECT_SAGA,
} from "../../constants/CyberBugs/CyberBugsConstants";
import {
	DISPLAY_LOADING,
	HIDE_LOADING,
} from "../../constants/LoadingConstants";
import { history } from "../../../util/libs/history";
import { projectService } from "../../../services/ProjectService";
import { notifyFunction } from "../../../util/Notification/NotificationCyberbugs";
import { CLOSE_DRAWER } from "../../constants/CyberBugs/DrawerConstants";

function* createProjectSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(1000);
	try {
		//Gọi api lấy dữ liệu về
		const { data, status } = yield call(() =>
			cyberbugsService.createProjectAuthorization(action.newProject)
		);

		if (status === STATUS_CODE.SUCCESS) {
			//Gọi api thành công sẽ dispatch lên reducer thông qua put()
			let history1 = yield select((state) => state.HistoryReducer.history);

			history1.push("/projectmanagement");
		}
	} catch (err) {
		console.log(err.response.data);
	}

	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiCreateProjectSaga() {
	yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

//Saga dùng để lấy all project api
//Đạt - Code ngày 27/12/2021

function* getListProjectSaga(action) {
	try {
		const { data, status } = yield call(() =>
			cyberbugsService.getListProject()
		);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_PROJECT_LIST,
				projectList: data.content,
			});
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiGetListProjectSaga() {
	yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}

//---------------UPDATE PROJECT --------------------
function* updateProjectSaga(action) {
	try {
		const { data, status } = yield call(() =>
			cyberbugsService.updateProject(action.projectUpdate)
		);

		if (status === STATUS_CODE.SUCCESS) {
			console.log(data);
		}
		yield call(getListProjectSaga);
		yield put({ type: CLOSE_DRAWER });
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiUpdateListProjectSaga() {
	yield takeLatest(UPDATE_LIST_PROJECT_SAGA, updateProjectSaga);
}

//---------------DELETE PROJECT --------------------
function* deleteProjectSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(1000);
	try {
		const { data, status } = yield call(() =>
			// cyberbugsService.updateProject(action.projectUpdate)
			projectService.deleteProject(action.idProject)
		);

		if (status === STATUS_CODE.SUCCESS) {
			console.log(data);
			notifyFunction("success", "Delete project successfully!", "");
		} else {
			notifyFunction("error", "Delete project fail!", "");
		}
		yield call(getListProjectSaga);
		yield put({ type: CLOSE_DRAWER });
	} catch (err) {
		notifyFunction("error", "Delete project fail!", "");
		console.log(err);
	}

	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiDeleteProjectSaga() {
	yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}

//---------------GET PROJECT DETAIL --------------------
function* getProjectDetailSaga(action) {
	// yield put({
	// 	type: DISPLAY_LOADING,
	// });
	// yield delay(1000);
	try {
		const { data, status } = yield call(() =>
			projectService.getProjectDetail(action.projectId)
		);
		//Lay du lieu thanh cong thi dua len redux
		yield put({
			type: PUT_PROJECT_DETAIL,
			projectDetail: data.content,
		});

		if (status === STATUS_CODE.SUCCESS) {
			// console.log(data);
		}
	} catch (err) {
		// console.log("404 Not Found!");
		console.log(err);
		let history = yield select((state) => state.HistoryReducer.history);
		history.push("/projectmanagement");
	}

	// yield put({
	// 	type: HIDE_LOADING,
	// });
}

export function* theoDoiGetProjectDetailSaga() {
	yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}

//---------------------GET ALL PROJECT --------------------

function* getAllProjectSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(1000);
	try {
		const { data, status } = yield call(() => projectService.getAllProject());

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_ALL_PROJECT,
				arrProject: data.content,
			});

			yield put({
				type: GET_USER_BY_PROJECT_ID_SAGA,
				projectId: data.content[0].id,
			});
		}
	} catch (err) {
		console.log(err);
	}

	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiGetAllProjectSaga() {
	yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
