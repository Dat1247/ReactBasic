import {
	add_task,
	change_theme,
	delete_task,
	done_task,
	edit_task,
} from "../types/ToDoListType";

export const addTaskAction = (newTask) => ({
	type: add_task,
	newTask,
});

export const changeThemeAction = (themeId) => ({
	type: change_theme,
	themeId,
});

export const doneTask = (taskId) => ({
	type: done_task,
	taskId,
});

export const deleteTask = (taskId) => ({
	type: delete_task,
	taskId,
});

export const editTask = (task) => ({
	type: edit_task,
	task,
});

// { return {} } === ({})
