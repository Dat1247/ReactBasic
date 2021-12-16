import React, { Component } from "react";
import Axios from "axios";
import "./Todolist.css";

export default class Todolist extends Component {
	state = {
		taskList: [],
		values: {
			taskName: "",
		},
		errors: {
			taskName: "",
		},
	};
	getTaskList = () => {
		let promise = Axios({
			url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
			method: "GET",
		});
		promise
			.then((result) => {
				console.log(result.data);
				this.setState({
					taskList: result.data,
				});
			})
			.catch((err) => console.log(err.response.data));
		// promise.catch();
	};
	renderTaskToDo = () => {
		return this.state.taskList
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
									this.delTask(item.taskName);
								}}>
								<i className='fa fa-trash-alt' />
							</button>
							<button
								className='complete'
								type='button'
								onClick={() => {
									this.checkTask(item.taskName);
								}}>
								<i className='far fa-check-circle' />
								<i className='fas fa-check-circle' />
							</button>
						</div>
					</li>
				);
			});
	};

	checkTask = (taskName) => {
		let promise = Axios({
			url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
			method: "PUT",
		});
		promise
			.then((res) => {
				alert(res.data);
				this.getTaskList();
			})
			.catch((err) => {
				alert(err.response.data);
			});
	};

	renderTaskToDoDone = () => {
		return this.state.taskList
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
									this.delTask(item.taskName);
								}}>
								<i className='fa fa-trash-alt' />
							</button>
							<button
								className='complete'
								type='button'
								onClick={() => {
									this.rejectTask(item.taskName);
								}}>
								<i className='far fa-check-circle' />
								<i className='fas fa-check-circle' />
							</button>
						</div>
					</li>
				);
			});
	};

	rejectTask = (taskName) => {
		let promise = Axios({
			url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
			method: "PUT",
		});
		promise
			.then((res) => {
				alert(res.data);
				this.getTaskList();
			})
			.catch((err) => {
				alert(err.response.data);
			});
	};

	delTask = (taskName) => {
		let promise = Axios({
			url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
			method: "DELETE",
		});
		promise
			.then((result) => {
				alert(result.data);
				this.getTaskList();
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	};

	componentDidMount() {
		this.getTaskList();
	}
	addTask = (e) => {
		e.preventDefault();
		// console.log(this.state.values.taskName);
		let promise = Axios({
			url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
			method: "POST",
			data: { taskName: this.state.values.taskName },
		});
		promise
			.then((result) => {
				// console.log(result);
				this.getTaskList();
			})
			.catch((err) => {
				alert(err.response.data);
			});
	};

	handleChange = (e) => {
		let { value, name } = e.target;
		// console.log(name, value);
		let newValues = { ...this.state.values };
		newValues = { ...newValues, [name]: value };
		let newErrors = { ...this.state.errors };
		let regexString = /^[a-zA-z]+$/;
		if (!regexString.test(value) || value.trim() === "") {
			newErrors[name] = name + " invalid!";
		} else {
			newErrors[name] = "";
		}
		// newErrors = {...this.state.errors, [name]: value.trim() === ""}

		this.setState({
			...this.state,
			values: newValues,
			errors: newErrors,
		});
	};

	render() {
		return (
			<form onSubmit={this.addTask}>
				<button
					onClick={() => {
						this.getTaskList();
					}}>
					Get task list
				</button>
				<div className='card'>
					<div className='card__header'>
						<img src={require("./bg.png").default} alt='bg' />
					</div>
					{/* <h2>hello!</h2> */}
					<div className='card__body'>
						<div className='card__content'>
							<div className='from-group'>
								<div className='card__title'>
									<h2>My Tasks</h2>
									<p>September 9,2020</p>
								</div>
								<div className='card__add'>
									<input
										id='newTask'
										type='text'
										placeholder='Enter an activity...'
										name='taskName'
										onChange={this.handleChange}
									/>
									<button id='addItem' onClick={this.addTask}>
										<i className='fa fa-plus' />
									</button>
								</div>
								<p className='text text-danger'>{this.state.errors.taskName}</p>
							</div>

							<div className='card__todo'>
								{/* Uncompleted tasks */}
								<ul className='todo' id='todo'>
									{this.renderTaskToDo()}
								</ul>
								{/* Completed tasks */}
								<ul className='todo' id='completed'>
									{this.renderTaskToDoDone()}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}
