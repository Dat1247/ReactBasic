import { ADD_COMMENT } from "../types/FakebookType";

const stateDefault = {
	comments: [
		{
			name: "Yone",
			content: "Hello all",
			avatar: `https://i.pravatar.cc/150?u=yone`,
		},
		{
			name: "Yasuo",
			content: "Hello Yone",
			avatar: `https://i.pravatar.cc/150?u=yasuo`,
		},
	],
};

export const FakebookReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case ADD_COMMENT:
			state.comments = [...state.comments, action.userComment];

			return { ...state };

		default:
			return { ...state };
	}
};
