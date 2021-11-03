import React, { Component } from "react";
import Chlid from "./Chlid";
import "./Styling.css";
import style from "./Styling.module.css";

export default class Styling extends Component {
	render() {
		// Luu y: viet duoi dang thuoc tinh document.getElementById(id).style.backgroundColor
		const styleText = {
			color: "pink",
			backgroundColor: "black",
			padding: "15px",
		};

		return (
			<div>
				<Chlid />
				<div className='txt'>Hello World</div>
				<p className={style.txtStyle}>Hello case 2</p>
				<p style={styleText}>Hello case 3</p>
			</div>
		);
	}
}
