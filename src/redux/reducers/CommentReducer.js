import {
	GET_ALL_COMMENT,
	ADD_COMMENT,
} from "../constants/CyberBugs/CommentConstants";

const initialState = {
	listComment: [],
	commentUpdated: {},
};

export const CommentReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_COMMENT: {
			return { ...state, listComment: action.listComment };
		}
		case ADD_COMMENT: {
			return {
				...state,
				listComment: [...state.listComment, action.newComment],
			};
		}
		default:
			return { ...state };
	}
};
