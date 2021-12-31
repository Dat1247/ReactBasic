import {
	GET_ALL_PROJECT,
	GET_PROJECT_LIST,
} from "../constants/CyberBugs/CyberBugsConstants";

const stateDefault = {
	projectList: [],
	arrProject: [], //Get all project cho dropdown
};

export const ProjectListCyberbugsReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case GET_PROJECT_LIST: {
			state.projectList = action.projectList;
			return { ...state };
		}
		case GET_ALL_PROJECT: {
			state.arrProject = action.arrProject;
			return { ...state };
		}
		default:
			return { ...state };
	}
};
