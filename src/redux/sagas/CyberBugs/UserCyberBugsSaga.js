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
import { notifyFunction } from "../../../util/Notification/NotificationCyberbugs";
import {
	GET_USER_API,
	GET_USER_SEARCH,
	ADD_USER_PROJECT_API,
	REMOVE_USER_PROJECT_API,
	GET_USER_ID_COMMENT_SAGA,
	GET_ALL_USER_SAGA,
	GET_USER_ID_COMMENT,
	GET_ALL_USER_APP,
	DELETE_USER_SAGA,
	EDIT_USER_SAGA,
	SIGN_UP_USER_SAGA,
} from "../../constants/CyberBugs/UserConstants";
import { CLOSE_DRAWER } from "../../constants/CyberBugs/DrawerConstants";

//Quản lý action saga

//-------------- SIGN IN SAGA ------------------------------
function* signinSaga(action) {
	const { userLogin } = action;

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
		history.push("/");

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

//--------------- GET USER SEARCH ----------------

function* getUserSearchSaga(action) {
	try {
		const { data, status } = yield call(() =>
			userService.getUser(action.keyWord)
		);

		// console.log(data);
		yield put({
			type: GET_USER_SEARCH,
			lstUserSearch: data.content,
		});

		// console.log(data);
	} catch (err) {
		console.log(err.response.data);
	}
}

export function* theoDoiGetUser() {
	yield takeLatest(GET_USER_API, getUserSearchSaga);
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
	yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
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
	yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga);
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
		if (status === STATUS_CODE.SUCCESS) {
			console.log(data);
			put({
				type: GET_USER_ID_COMMENT,
				userComment: data.content,
			});
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiGetUserComment() {
	yield takeLatest(GET_USER_ID_COMMENT_SAGA, getUserComment);
}

//-------------- GET ALL USER  ------------------------------
function* getAllUserSaga(action) {
	try {
		const { data, status } = yield call(() =>
			userService.getUser(action.keyWord)
		);

		yield put({
			type: GET_ALL_USER_APP,
			listAllUser: data.content,
		});

		// console.log(data);
	} catch (err) {
		console.log(err.response.data);
	}
}

export function* theoDoiGetAllUserSaga() {
	yield takeLatest(GET_ALL_USER_SAGA, getAllUserSaga);
}

//-------------- DELETE USER ------------------------------
function* deleteUserSaga(action) {
	try {
		const { data, status } = yield call(() =>
			userService.deleteUser(action.userId)
		);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_ALL_USER_SAGA,
				keyWord: "",
			});
		}
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiDeleteUserSaga() {
	yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}

//-------------- EDIT USER SAGA ------------------------------
function* editUserSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(300);
	try {
		const { data, status } = yield call(() =>
			userService.editUser(action.userEdit)
		);

		if (status === STATUS_CODE.SUCCESS) {
			yield put({
				type: GET_ALL_USER_SAGA,
				keyWord: "",
			});
			notifyFunction("success", "Edit user successfully!", "");

			yield put({ type: CLOSE_DRAWER });
		}
	} catch (err) {
		console.log(err);
	}

	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiEditUserSaga() {
	yield takeLatest(EDIT_USER_SAGA, editUserSaga);
}

//--------------- SIGN UP USER SAGA --------------------
function* signUpUserSaga(action) {
	yield put({
		type: DISPLAY_LOADING,
	});
	yield delay(1000);

	try {
		const { data, status } = yield call(() =>
			userService.signUpUser(action.userSignUp)
		);
		console.log(data);

		yield put({
			type: GET_ALL_USER_SAGA,
			keyWord: "",
		});

		yield put({ type: CLOSE_DRAWER });

		notifyFunction("success", "Sign up successfully!", "");
	} catch (err) {
		const message = err.response.data.message;
		notifyFunction("error", `${message}`, "");
	}

	yield put({
		type: HIDE_LOADING,
	});
}

export function* theoDoiSignUpUserSaga() {
	yield takeLatest(SIGN_UP_USER_SAGA, signUpUserSaga);
}
