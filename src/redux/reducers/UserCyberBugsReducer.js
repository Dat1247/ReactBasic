import { USER_LOGIN } from "../../util/constants/settingSystem";
import {
	GET_USER_BY_PROJECT_ID,
	USLOGIN,
} from "../constants/CyberBugs/CyberBugsConstants";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
	usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
	userLogin: usLogin,
	userSearch: [],
	arrUser: [], //Arr user cho thẻ Select create task
};

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case USLOGIN: {
			state.userLogin = action.userLogin;
			return { ...state };
		}

		case "GET_USER_SEARCH": {
			state.userSearch = action.lstUserSearch;
			console.log(state.userSearch);
			return { ...state };
		}
		case GET_USER_BY_PROJECT_ID: {
			return { ...state, arrUser: action.arrUser };
		}
		default:
			return { ...state };
	}
};
