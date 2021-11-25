import React, { Component } from "react";
import { Container } from "../../ComponentTodoList/Container";
import { ThemeProvider } from "styled-components";
import { ToDoListDarkTheme } from "../../Themes/TodoListDarkTheme";
import { TodoListLightTheme } from "../../Themes/TodoListLightTheme";
import { TodoListPrimaryTheme } from "../../Themes/TodoListPrimaryTheme";
import { Dropdown } from "../../ComponentTodoList/Dropdown";
import {
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
} from "../../ComponentTodoList/Heading";
import { TextField, Label, Input } from "../../ComponentTodoList/TextField";
import { Button } from "../../ComponentTodoList/Button";
import { Table, Thead, Tbody, Tr, Td, Th } from "../../ComponentTodoList/Table";

import { connect } from "react-redux";
import {
	addTaskAction,
	changeThemeAction,
	deleteTask,
	doneTask,
	editTask,
} from "../../../redux/actions/ToDoListAction";
import { arrTheme } from "../../Themes/ThemeManager";

class TodoList extends Component {
	state = {
		taskName: "",
	};
	renderTaskToDo = () => {
		return this.props.taskList
			.filter((task) => task.done === false)
			.map((task, index) => {
				return (
					<Tr key={index}>
						<Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
						<Th className='text-right'>
							<Button
								className='ml-1'
								onClick={() => {
									this.props.dispatch(editTask(task));
								}}>
								<i className='fa fa-edit'></i>
							</Button>
							<Button
								className='ml-1'
								onClick={() => {
									this.props.dispatch(doneTask(task.id));
								}}>
								<i className='fa fa-check'></i>
							</Button>
							<Button
								className='ml-1'
								onClick={() => {
									this.props.dispatch(deleteTask(task.id));
								}}>
								<i className='fa fa-trash'></i>
							</Button>
						</Th>
					</Tr>
				);
			});
	};

	renderTaskCompleted = () => {
		return this.props.taskList
			.filter((task) => task.done)
			.map((task, index) => {
				return (
					<Tr key={index}>
						<Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
						<Th className='text-right'>
							<Button
								className='ml-1'
								onClick={() => {
									this.props.dispatch(deleteTask(task.id));
								}}>
								<i className='fa fa-trash'></i>
							</Button>
						</Th>
					</Tr>
				);
			});
	};

	renderTheme = () => {
		return arrTheme.map((theme, index) => {
			return (
				<option value={theme.id} key={index}>
					{theme.name}
				</option>
			);
		});
	};

	render() {
		return (
			<ThemeProvider theme={this.props.themeToDoList}>
				<div>
					<Container className='w-50'>
						<Dropdown
							onChange={(e) => {
								let { value } = e.target;

								this.props.dispatch(changeThemeAction(value));
							}}>
							{this.renderTheme()}
						</Dropdown>
						<Heading3>To do list</Heading3>
						<TextField
							onChange={(e) => {
								this.setState(
									{
										taskName: e.target.value,
									},
									() => {
										// console.log(this.state);
									}
								);
							}}
							value={this.props.taskEdit.taskName}
							name='taskName'
							label='Task name'
							className='w-50'
						/>
						<Button
							className='ml-2'
							onClick={() => {
								// Lay thong tin nguoi dung nhap vao
								let { taskName } = this.state;

								// Tao ra 1 obj task
								let newTask = {
									id: Date.now(),
									taskName: taskName,
									done: false,
								};
								// console.log(newTask);
								//Dua obj task len redux thong qua phuong thuc dispatch
								this.props.dispatch(addTaskAction(newTask));
							}}>
							{" "}
							<i className='fa fa-plus'></i> Add task
						</Button>
						<Button className='ml-2'>
							{" "}
							<i className='fa fa-upload'></i> Update task
						</Button>

						<hr />

						<Heading3>Task to do</Heading3>
						<Table>
							<Thead>{this.renderTaskToDo()}</Thead>
						</Table>
						<Heading3>Task completed</Heading3>
						<Table>
							<Thead>{this.renderTaskCompleted()}</Thead>
						</Table>
					</Container>
				</div>
			</ThemeProvider>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		themeToDoList: state.ToDoListReducer.themeToDoList,
		taskList: state.ToDoListReducer.taskList,
		taskEdit: state.ToDoListReducer.taskEdit,
	};
};

export default connect(mapStateToProps)(TodoList);
