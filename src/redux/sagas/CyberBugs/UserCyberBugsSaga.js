import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugsService";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import {
	USER_SIGNIN_API,
	USLOGIN,
} from "../../constants/CyberBugs/CyberBugsConstants";
import {
	DISPLAY_LOADING,
	HIDE_LOADING,
} from "../../constants/LoadingConstants";

//Quản lý action saga

function* signinSaga(action) {
	const { userLogin } = action;
	// console.log(action);
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(500);
	try {
		const { data, status } = yield call(() => {
			return cyberbugsService.signinCyberBugs(userLogin);
		});

		//Lưu vào localStorage khi đăng nhập thành công
		localStorage.setItem(TOKEN, data.content.accessToken);
		localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

		yield put({
			type: USLOGIN,
			userLogin: data.content,
		});

		let history = yield select((state) => state.HistoryReducer.history);
		// console.log(history);
		history.push("/home");

		// console.log(data);
	} catch (err) {
		console.log(err.response.data);
	}

	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiSignin() {
	yield takeLatest(USER_SIGNIN_API, signinSaga);
}
