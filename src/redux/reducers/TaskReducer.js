import {
	CHANGE_ASSIGNEES,
	CHANGE_TASK_MODAL,
	GET_TASK_DETAIL,
	REMOVE_USER_ASSIGN,
} from "../constants/CyberBugs/CyberBugsConstants";

const initialState = {
	taskDetailModal: {},
};

export const TaskReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TASK_DETAIL: {
			return { ...state, taskDetailModal: action.taskDetailModal };
		}
		case CHANGE_TASK_MODAL: {
			const { name, value } = action;
			return {
				...state,
				taskDetailModal: { ...state.taskDetailModal, [name]: value },
			};
		}

		case CHANGE_ASSIGNEES: {
			state.taskDetailModal.assigness = [
				...state.taskDetailModal.assigness,
				action.userSelect,
			];
			return { ...state };
		}
		case REMOVE_USER_ASSIGN: {
			state.taskDetailModal.assigness = [
				...state.taskDetailModal.assigness.filter(
					(us) => us.id !== action.userId
				),
			];
			return { ...state };
		}
		default:
			return { ...state };
	}
};
