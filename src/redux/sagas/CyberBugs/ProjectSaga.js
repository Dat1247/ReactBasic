import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";

import {
	DISPLAY_LOADING,
	HIDE_LOADING,
} from "../../constants/LoadingConstants";

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
			console.log(data);
		}
	} catch (err) {
		console.log(err.response.data);
	}

	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiCreateProjectSaga() {
	yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}
