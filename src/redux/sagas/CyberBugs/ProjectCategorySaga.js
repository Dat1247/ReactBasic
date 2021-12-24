import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
	GET_ALL_PROJECT_CATEGORY,
	GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../constants/CyberBugs/CyberBugsConstants";

function* getAllProjectCategory(action) {
	console.log(action);

	try {
		//Gọi api lấy dữ liệu về
		const { data, status } = yield call(() =>
			cyberbugsService.getAllProjectCategory()
		);

		if (status === STATUS_CODE.SUCCESS) {
			//Gọi api thành công sẽ dispatch lên reducer thông qua put()
			yield put({
				type: GET_ALL_PROJECT_CATEGORY,
				data: data.content,
			});
		}
	} catch (err) {
		console.log(err.response.data);
	}
}

export function* theoDoigetAllProjetCategory() {
	yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory);
}
