import { GET_ALL_PROJECT_CATEGORY } from "../constants/CyberBugs/CyberBugsConstants";

const stateDefault = {
	arrProjectCategory: [],
};

export const ProjectCyberbugsReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case GET_ALL_PROJECT_CATEGORY: {
			state.arrProjectCategory = action.data;
			return { ...state };
		}
		default:
			return { ...state };
	}
};
