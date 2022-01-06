import { USER_LOGIN } from "../../util/constants/settingSystem";
import {
	GET_USER_BY_PROJECT_ID,
	USLOGIN,
} from "../constants/CyberBugs/CyberBugsConstants";
import {
	EDIT_USER,
	GET_ALL_USER_APP,
	GET_USER_ID_COMMENT,
	GET_USER_SEARCH,
} from "../constants/CyberBugs/UserConstants";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
	usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
	userLogin: usLogin,
	arrAllUser: [],
	userSearch: [],
	arrUser: [], //Arr user cho thẻ Select create task
	//User comment
	userComment: usLogin,
	//Edit user
	editUser: {
		id: "",
		passWord: "",
		email: "",
		name: "",
		phoneNumber: "",
	},
	//Sign up user
	userSignUp: {
		email: "",
		passWord: "",
		name: "",
		phoneNumber: "",
	},
};

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case USLOGIN: {
			state.userLogin = action.userLogin;
			return { ...state };
		}
		case GET_ALL_USER_APP: {
			state.arrAllUser = action.listAllUser;
			return { ...state };
		}
		case GET_USER_SEARCH: {
			state.userSearch = action.lstUserSearch;
			// console.log(state.userSearch);
			return { ...state };
		}
		case GET_USER_BY_PROJECT_ID: {
			return { ...state, arrUser: action.arrUser };
		}
		case GET_USER_ID_COMMENT: {
			return { ...state, userComment: action.userComment };
		}
		case EDIT_USER: {
			state.editUser = action.editUser;
			return { ...state };
		}
		default:
			return { ...state };
	}
};
