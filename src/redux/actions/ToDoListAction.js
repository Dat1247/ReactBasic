import Axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConstant";

//Action có 2 loại:
/**
 * Action thực thi ngay, làm thay đổi reducer (action 1)
 * Action phải thực hiện xử lý rồi mới gọi action 1 thực thi (async action)
 */

export const getTaskAPI = () => {
	return async (dispatch) => {
		try {
			let { data, status } = await Axios({
				url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
				method: "GET",
			});
			if (status === 200) {
				dispatch({
					type: GET_TASK_API,
					taskName: data,
				});
			}
		} catch (err) {
			console.log(err.response.data);
		}
		// promise
		// 	.then((result) => {
		// 		// console.log(result.data);
		// 		dispatch({
		// 			type: GET_TASK_API,
		// 			taskName: result.data,
		// 		});
		// 	})
		// 	.catch((err) => console.log(err.response.data));
	};
};

export const addTaskAPI = (taskName) => {
	return async (dispatch) => {
		try {
			let { data, status } = await Axios({
				url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
				method: "POST",
				data: { taskName: taskName },
			});
			if (status === 200) {
				dispatch(getTaskAPI());
			}
		} catch (err) {
			console.log(err.response.data);
		}
		// promise
		// 	.then((result) => {
		// 		// console.log(result);
		// 		dispatch(getTaskAPI());
		// 	})
		// 	.catch((err) => {
		// 		alert(err.response.data);
		// 	});
	};
};

export const deleteTaskAPI = (taskName) => {
	return async (dispatch) => {
		try {
			let { status, data } = await Axios({
				url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
				method: "DELETE",
			});
			if (status === 200) {
				dispatch(getTaskAPI());
			}
		} catch (err) {
			console.log(err.response.data);
		}
		// promise
		// 	.then((result) => {
		// 		dispatch(getTaskAPI());
		// 	})
		// 	.catch((error) => {
		// 		console.log(error.response.data);
		// 	});
	};
};

export const checkTaskAPI = (taskName) => {
	return (dispatch) => {
		let promise = Axios({
			url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
			method: "PUT",
		});
		promise
			.then((res) => {
				dispatch(getTaskAPI());
			})
			.catch((err) => {
				alert(err.response.data);
			});
	};
};

export const rejectTaskAPI = (taskName) => {
	return (dispatch) => {
		let promise = Axios({
			url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
			method: "PUT",
		});
		promise
			.then((res) => {
				dispatch(getTaskAPI());
			})
			.catch((err) => {
				alert(err.response.data);
			});
	};
};
