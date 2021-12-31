import { GET_ALL_TASK_TYPE } from "../constants/CyberBugs/CyberBugsConstants";

const initialState = {
	arrTaskTypes: [],
};

export const TaskTypeReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_TASK_TYPE:
			return { ...state, arrTaskTypes: action.arrTaskTypes };

		default:
			return { ...state };
	}
};
