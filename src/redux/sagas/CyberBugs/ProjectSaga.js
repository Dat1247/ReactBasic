import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
	CREATE_PROJECT_SAGA,
	GET_LIST_PROJECT_SAGA,
	GET_PROJECT_LIST,
} from "../../constants/CyberBugs/CyberBugsConstants";
import {
	DISPLAY_LOADING,
	HIDE_LOADING,
} from "../../constants/LoadingConstants";
import { history } from "../../../util/libs/history";

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
		// yield put({
		// 	type: GET_LIST_PROJECT_SAGA,
		// });
		yield call(getListProjectSaga);
		yield put({ type: "CLOSE_DRAWER" });
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiUpdateListProjectSaga() {
	yield takeLatest("UPDATE_LIST_PROJECT_SAGA", updateProjectSaga);
}
