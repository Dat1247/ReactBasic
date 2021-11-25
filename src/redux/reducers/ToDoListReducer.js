import { ToDoListDarkTheme } from "../../JSS_Styled-component/Themes/TodoListDarkTheme";
import {
	add_task,
	change_theme,
	delete_task,
	done_task,
	edit_task,
} from "../types/ToDoListType";
import { arrTheme } from "../../JSS_Styled-component/Themes/ThemeManager";

const initialState = {
	themeToDoList: ToDoListDarkTheme,
	taskList: [
		{ id: "task-1", taskName: "task 1", done: true },
		{ id: "task-2", taskName: "task 2", done: false },
		{ id: "task-3", taskName: "task 3", done: true },
		{ id: "task-4", taskName: "task 4", done: false },
	],
	taskEdit: { id: "task-4", taskName: "task 4", done: false },
};

const ToDoListReducer = (state = initialState, action) => {
	switch (action.type) {
		case add_task: {
			// Kiem tra rong
			if (action.newTask.taskName.trim() === "") {
				alert("Task name is required !");
				return { ...state };
			}
			//Kiem tra ton tai
			let taskListUpdate = [...state.taskList];
			let index = taskListUpdate.findIndex(
				(task) => task.taskName === action.newTask.taskName
			);
			if (index !== -1) {
				alert("Task name already exists !");
				return { ...state };
			}

			taskListUpdate.push(action.newTask);

			// Xu ly xong thi gan lai task list moi = task list hien tai
			state.taskList = taskListUpdate;
			return { ...state };
		}
		case change_theme: {
			let theme = arrTheme.find((theme) => theme.id == action.themeId);
			if (theme !== -1) {
				state.themeToDoList = { ...theme.theme };
			}
			return { ...state };
		}
		case done_task: {
			let taskListUpdate = [...state.taskList];
			let index = taskListUpdate.findIndex((task) => task.id === action.taskId);
			if (index !== -1) {
				taskListUpdate[index].done = true;
			}
			return { ...state, taskList: taskListUpdate };
		}
		case delete_task: {
			let taskListUpdate = [...state.taskList];
			// let index = taskListUpdate.findIndex((task) => task.id === action.taskId);
			// if (index !== -1) {
			// 	taskListUpdate.splice(index, 1);
			// }

			taskListUpdate = taskListUpdate.filter(
				(task) => task.id !== action.taskId
			);

			return { ...state, taskList: taskListUpdate };
			// return {...state, taskList: state.taskList.filter(task => task.id !== action.taskId)}
		}
		case edit_task: {
			console.log(action);
			return { ...state, taskEdit: action.task };
		}
		default:
			return { ...state };
	}
};

export default ToDoListReducer;
