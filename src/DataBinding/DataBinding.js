import React, { Component } from "react";
import Header from "../component/Demo/Header";

export default class DataBinding extends Component {
	// Tao 1 thuoc tinh
	name = "Ho Quan Dat";

	//Thuoc tinh object student
	student = {
		name: "Ho A",
		age: 20,
	};

	//Binding bang phuong thuc
	renderImage = () => {
		return (
			<img src='http://casestudy.cyberlearn.vn/image/covid.jpg' alt='covid' />
		);
	};

	renderMultiComponent = () => {
		// const virus = {
		//     name: 'Covid',
		//     alias: 'SARs-Cov-2'
		// }

		return <Header />;
	};

	render() {
		// Bien cua ham` render, khong su dung duoc cho ham khac
		const school = "Cyberlearn";

		return (
			<div>
				<h1>React class component - Data Binding</h1>
				<hr />
				<h1>
					{" "}
					Hello {this.name} - School: {school}
				</h1>

				<h1>Binding object</h1>
				<h2>
					{this.student.name} - {this.student.age}
				</h2>

				<h3>Binding function</h3>
				{this.renderImage()}
				{this.renderMultiComponent()}
			</div>
		);
	}
}
