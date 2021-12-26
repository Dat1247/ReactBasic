import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function TodolistRFC(props) {
	let [state, setState] = useState({
		taskList: [],
		values: {
			taskName: "",
		},
		errors: {
			taskName: "",
		},
	});

	const handleChange = (e) => {
		let { value, name } = e.target;
		// console.log(name, value);
		let newValues = { ...state.values };
		newValues = { ...newValues, [name]: value };
		let newErrors = { ...state.errors };
		let regexString = /^[a-zA-z]+$/;
		if (!regexString.test(value) || value.trim() === "") {
			newErrors[name] = name + " invalid!";
		} else {
			newErrors[name] = "";
		}
		// newErrors = {...state.errors, [name]: value.trim() === ""}
		setState({
			...state,
			values: newValues,
			errors: newErrors,
		});
	};

	const addTask = (e) => {
		e.preventDefault();
		let promise = Axios({
			url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
			method: "POST",
			data: { taskName: state.values.taskName },
		});
		promise
			.then((result) => {
				// console.log(result);
				getTaskList();
			})
			.catch((err) => {
				alert(err.response.data);
			});
	};

	const getTaskList = () => {
		let promise = Axios({
			url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
			method: "GET",
		});
		promise
			.then((result) => {
				// console.log(result.data);
				setState({
					...state,
					taskList: result.data,
				});
			})
			.catch((err) => console.log(err.response.data));
		// promise.catch();
	};

	const checkTask = (taskName) => {
		let promise = Axios({
			url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
			method: "PUT",
		});
		promise
			.then((res) => {
				alert(res.data);
				getTaskList();
			})
			.catch((err) => {
				alert(err.response.data);
			});
	};

	const rejectTask = (taskName) => {
		let promise = Axios({
			url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
			method: "PUT",
		});
		promise
			.then((res) => {
				alert(res.data);
				getTaskList();
			})
			.catch((err) => {
				alert(err.response.data);
			});
	};

	const delTask = (taskName) => {
		let promise = Axios({
			url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
			method: "DELETE",
		});
		promise
			.then((result) => {
				alert(result.data);
				getTaskList();
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	};

	useEffect(() => {
		getTaskList();

		//Dùng cho WillUnMount
		// return () =>{}
	}, []);

	const renderTaskToDo = () => {
		return state.taskList
			.filter((item) => !item.status)
			.map((item, index) => {
				return (
					<li key={index}>
						<span>{item.taskName}</span>
						<div className='buttons'>
							<button
								className='remove'
								type='button'
								onClick={() => {
									delTask(item.taskName);
								}}>
								<i className='fa fa-trash-alt' />
							</button>
							<button
								className='complete'
								type='button'
								onClick={() => {
									checkTask(item.taskName);
								}}>
								<i className='far fa-check-circle' />
								<i className='fas fa-check-circle' />
							</button>
						</div>
					</li>
				);
			});
	};

	const renderTaskToDoDone = () => {
		return state.taskList
			.filter((item) => item.status)
			.map((item, index) => {
				return (
					<li key={index}>
						<span>{item.taskName}</span>
						<div className='buttons'>
							<button
								className='remove'
								type='button'
								onClick={() => {
									delTask(item.taskName);
								}}>
								<i className='fa fa-trash-alt' />
							</button>
							<button
								className='complete'
								type='button'
								onClick={() => {
									rejectTask(item.taskName);
								}}>
								<i className='far fa-check-circle' />
								<i className='fas fa-check-circle' />
							</button>
						</div>
					</li>
				);
			});
	};

	return (
		<div className='card'>
			<div className='card__header'>
				<img src={require("./bg.png").default} alt='bg' />
			</div>
			{/* <h2>hello!</h2> */}
			<form className='card__body' onSubmit={addTask}>
				<div className='card__content'>
					<div className='card__title'>
						<h2>My Tasks</h2>
						<p>September 9,2020</p>
					</div>
					<div className='card__add'>
						<input
							id='newTask'
							type='text'
							name='taskName'
							placeholder='Enter an activity...'
							onChange={handleChange}
						/>
						<button id='addItem' type='submit' onClick={addTask}>
							<i className='fa fa-plus' />
						</button>
					</div>
					<div className='card__todo'>
						{/* Uncompleted tasks */}
						<ul className='todo' id='todo'>
							{renderTaskToDo()}
						</ul>
						{/* Completed tasks */}
						<ul className='todo' id='completed'>
							{renderTaskToDoDone()}
						</ul>
					</div>
				</div>
			</form>
		</div>
	);
}