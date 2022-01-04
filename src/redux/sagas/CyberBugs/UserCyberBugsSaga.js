import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugsService";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
	GET_LIST_PROJECT_SAGA,
	USER_SIGNIN_API,
	USLOGIN,
	GET_USER_BY_PROJECT_ID_SAGA,
	GET_USER_BY_PROJECT_ID,
} from "../../constants/CyberBugs/CyberBugsConstants";
import {
	DISPLAY_LOADING,
	HIDE_LOADING,
} from "../../constants/LoadingConstants";
import { userService } from "../../../services/UserService";

//Quản lý action saga

function* signinSaga(action) {
	const { userLogin } = action;
	console.log(action);
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

		//Chuyển trang sau khi đã đăng nhập thành công
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

function* getUserSaga(action) {
	try {
		const { data, status } = yield call(() =>
			userService.getUser(action.keyWord)
		);

		console.log(data);
		yield put({
			type: "GET_USER_SEARCH",
			lstUserSearch: data.content,
		});

		// console.log(data);
	} catch (err) {
		console.log(err.response.data);
	}
}

export function* theoDoiGetUser() {
	yield takeLatest("GET_USER_API", getUserSaga);
}

//------------------ADD USER PROJECT --------------------------------

function* addUserProjectSaga(action) {
	try {
		const { data, status } = yield call(() =>
			userService.assignUserProject(action.userProject)
		);

		yield put({
			type: GET_LIST_PROJECT_SAGA,
		});

		// console.log(data);
	} catch (err) {
		console.log(err.response.data);
	}
}

export function* theoDoiAddUserProject() {
	yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

//------------------DELETE USER PROJECT --------------------------------

function* removeUserProjectSaga(action) {
	try {
		const { data, status } = yield call(() =>
			userService.deleteUserFromProject(action.userProject)
		);

		yield put({
			type: GET_LIST_PROJECT_SAGA,
		});

		// console.log(data);
	} catch (err) {
		console.log(err.response.data);
	}
}

export function* theoDoiRemoveUserProject() {
	yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}

//-------------- GET USER BY PROJECT --------------------------------

function* getUserByProjectIdSaga(action) {
	try {
		const { data, status } = yield call(() =>
			userService.getUserByProjectId(action.projectId)
		);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_USER_BY_PROJECT_ID,
				arrUser: data.content,
			});
		}
	} catch (err) {
		console.log(err.response.data);
		if (err.response.data.statusCode === STATUS_CODE.NOT_FOUND) {
			yield put({
				type: GET_USER_BY_PROJECT_ID,
				arrUser: [],
			});
		}
	}
}

export function* theoDoiGetUserByProjectIdSaga() {
	yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

//-------------- GET USER COMMENT ------------------------------
function* getUserComment(action) {
	try {
		const { data, status } = yield call(() =>
			userService.getUser(action.userId)
		);
		console.log(data);
		put({
			type: "GET_USER_ID_COMMENT",
			userComment: data.content,
		});
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiGetUserComment() {
	yield takeLatest("GET_USER_ID_COMMENT_SAGA", getUserComment);
}
