import React, { Component } from "react";

export default class HandleComponent extends Component {
	//Dinh nghia ham xu ly su kien khi click vao button Click me
	handleClick = () => {
		console.log("Hello");
	};

	//Truyen tham so xu ly khi click vao button Click me 2
	handleClickPara = (para) => {
		alert("Para: " + para);
	};

	render() {
		return (
			<div>
				<button onClick={this.handleClick}>Click me!</button>

				<button onClick={this.handleClickPara.bind(this, "Hello guy!")}>
					Click me 2!
				</button>
			</div>
		);
	}
}
