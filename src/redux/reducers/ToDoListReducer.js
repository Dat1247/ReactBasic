import { GET_TASK_API } from "../constants/ToDoListConstant";

const initialState = {
	taskList: [],
};

export const ToDoListReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TASK_API: {
			// console.log(action);
			state.taskList = action.taskName;
			return { ...state };
		}

		default:
			return { ...state };
	}
};
