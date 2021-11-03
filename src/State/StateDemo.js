import React, { Component } from "react";

export default class StateDemo extends Component {
	//state: thuoc tinh co san cua react class component
	state = {
		status: false,
	};

	userLogin = {
		name: "Quan Dat",
		age: 20,
	};

	login = () => {
		this.setState({ status: true }, () => {
			console.log(this.state);
		});
	};

	renderUserLogin = () => {
		if (this.state.status) {
			return <div className='text'>{this.userLogin.name}</div>;
		}

		return (
			<button
				onClick={() => {
					this.login();
				}}>
				Log in
			</button>
		);
	};

	render() {
		return <div>{this.renderUserLogin()}</div>;
	}
}
