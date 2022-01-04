import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
	ADD_COMMENT_SAGA,
	GET_ALL_COMMENT,
	GET_ALL_COMMENT_SAGA,
	DELETE_COMMENT_SAGA,
	UPDATE_COMMENT_SAGA,
} from "../../constants/CyberBugs/CommentConstants";

// Lay du lieu cac comment theo taskId
function* getAllCommentSaga(action) {
	try {
		const { data, status } = yield call(() =>
			commentService.getAllComment(action.taskId)
		);
		if (status === STATUS_CODE.SUCCESS) {
		}
		yield put({
			type: GET_ALL_COMMENT,
			listComment: data.content,
		});
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiGetAllComment() {
	yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}

//---------------------------- ADD COMMENT ----------------------------
function* addCommentSaga(action) {
	const { objComment } = action;

	try {
		const { data, status } = yield call(() =>
			commentService.addComment(objComment)
		);

		yield put({
			type: GET_ALL_COMMENT_SAGA,
			taskId: objComment.taskId,
		});
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiAddComment() {
	yield takeLatest(ADD_COMMENT_SAGA, addCommentSaga);
}

//--------------------- DELETE COMMENT -------------------------
function* deleteCommentSaga(action) {
	try {
		const { data, status } = yield call(() =>
			commentService.deleteComment(action.idComment)
		);

		console.log(data);
		yield put({
			type: GET_ALL_COMMENT_SAGA,
			taskId: action.taskId,
		});
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiDeleteComment() {
	yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}

//--------------- UPDATE COMMENT --------------------
function* updateCommentSaga(action) {
	try {
		const { data, status } = yield call(() =>
			commentService.updateComment(action.updateComment)
		);
		yield put({
			type: GET_ALL_COMMENT_SAGA,
			taskId: data.content.taskId,
		});
	} catch (err) {
		console.log(err);
	}
}

export function* theoDoiUpdateComment() {
	yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}
