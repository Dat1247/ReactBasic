import { ADD_COMMENT } from "../types/FakebookType";

export const addComment = (userComment) => ({
	type: ADD_COMMENT,
	userComment,
});
