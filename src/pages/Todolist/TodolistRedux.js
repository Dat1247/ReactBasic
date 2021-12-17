import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addTaskAPI,
	checkTaskAPI,
	deleteTaskAPI,
	getTaskAPI,
	rejectTaskAPI,
} from "../../redux/actions/ToDoListAction";
import { GET_TASK_API } from "../../redux/constants/ToDoListConstant";

export default function TodolistRedux(props) {
	const taskList = useSelector((state) => state.ToDoListReducer.taskList);
	const dispatch = useDispatch();
	let [state, setState] = useState({
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

		dispatch(addTaskAPI(state.values.taskName));
	};

	const getTaskList = () => {
		dispatch(getTaskAPI());
	};

	const checkTask = (taskName) => {
		dispatch(checkTaskAPI(taskName));
	};

	const rejectTask = (taskName) => {
		dispatch(rejectTaskAPI(taskName));
	};

	const delTask = (taskName) => {
		dispatch(deleteTaskAPI(taskName));
	};

	useEffect(() => {
		getTaskList();

		//Dùng cho WillUnMount
		// return () =>{}
	}, []);

	const renderTaskToDo = () => {
		return taskList
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
		return taskList
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
