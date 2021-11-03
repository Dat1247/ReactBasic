import React, { Component } from "react";

export default class RenderingCondition extends Component {
	login = false;
	username = "Ho Quan Dat";

	render() {
		return (
			<div>
				{this.login ? <p>Hello {this.username}</p> : <button>Log in</button>}
			</div>
		);
	}
}
