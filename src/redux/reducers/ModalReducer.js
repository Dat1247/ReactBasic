import React from "react";
import { OPEN_FORM } from "../constants/CyberBugs/CyberBugsConstants";
const stateDefault = {
	Component: <p>Nội dung mặc định</p>,
};

export const ModalReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case OPEN_FORM: {
			state.Component = action.Component;
			return { ...state };
		}
		default:
			return { ...state };
	}
};
