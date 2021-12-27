import { GET_PROJECT_LIST } from "../constants/CyberBugs/CyberBugsConstants";

const stateDefault = {
	projectList: [],
};

export const ProjectListCyberbugsReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case GET_PROJECT_LIST: {
			state.projectList = action.projectList;
			return { ...state };
		}
		default:
			return { ...state };
	}
};
