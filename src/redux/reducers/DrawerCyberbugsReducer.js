import React from "react";
import {
	CLOSE_DRAWER,
	OPEN_DRAWER,
	OPEN_FORM_CREATE_TASK,
	OPEN_FORM_EDIT_PROJECT,
	OPEN_FORM_EDIT_USER,
	OPEN_FORM_SIGN_UP_USER,
	SET_SUBMIT_CREATE_TASK,
	SET_SUBMIT_EDIT_PROJECT_FORM,
} from "../constants/CyberBugs/DrawerConstants";
const initialState = {
	visible: false,
	title: "",
	ComponentDrawerContent: <p>Default content</p>,
	callBackSubmit: () => {
		alert("Click demo!");
	},
};

const DrawerCyberbugsReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_DRAWER: {
			return { ...state, visible: true };
		}
		case CLOSE_DRAWER: {
			return { ...state, visible: false };
		}
		case OPEN_FORM_EDIT_PROJECT: {
			return {
				...state,
				visible: true,
				title: action.title,
				ComponentDrawerContent: action.Component,
			};
		}
		case SET_SUBMIT_EDIT_PROJECT_FORM: {
			state.callBackSubmit = action.submitFunction;
			return { ...state };
		}

		case SET_SUBMIT_CREATE_TASK: {
			state.callBackSubmit = action.submitFunction;
			return { ...state };
		}
		case OPEN_FORM_CREATE_TASK: {
			state.visible = true;
			state.title = action.title;
			state.ComponentDrawerContent = action.Component;
			return { ...state };
		}
		case OPEN_FORM_EDIT_USER: {
			state.visible = true;
			state.title = action.title;
			state.ComponentDrawerContent = action.Component;
			return { ...state };
		}
		case OPEN_FORM_SIGN_UP_USER: {
			state.visible = true;
			state.title = action.title;
			state.ComponentDrawerContent = action.Component;
			return { ...state };
		}
		default:
			return { ...state };
	}
};

export default DrawerCyberbugsReducer;
