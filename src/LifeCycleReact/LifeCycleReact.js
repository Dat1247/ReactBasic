import React, { Component } from "react";
import ChildComponent from "./ChildComponent";

export default class LifeCycleReact extends Component {
	// Các dự án cũ - Thứ tự chạy trước Life-cycle
	constructor(props) {
		super(props);
		this.state = {
			number: 1,
		};
	}

	// state = { number: 1 };

	// Được gọi khi component này được sử dụng trên DOM (hoặc giao diện của app)
	static getDerivedStateFromProps(newProps, currenState) {
		console.log("getDerivedStateFromProps");
		return null;
	}

	// Được gọi khi setState hoặc props
	shouldComponentUpdate(newProps, newState) {
		return true; //True: gọi render, chạy tiếp các life-cycle còn lại - False: không gọi render, không chạy tiếp các life-cycle khác
	}

	render() {
		return (
			<div>
				<h1>Parent component</h1>
				<span>Number: {this.state.number}</span>
				<button
					className='btn btn-success'
					onClick={() => {
						this.setState({
							number: this.state.number + 1,
						});
					}}>
					+
				</button>
				{this.state.number === 1 || this.state.number === 3 ? (
					<ChildComponent />
				) : (
					""
				)}
			</div>
		);
	}

	// được gọi sau render và chỉ được gọi 1 lần duy nhất
	componentDidMount() {
		console.log("componentDidMount");
	}

	// Lần đầu sẽ không gọi, chỉ gọi khi setState hoặc thay đổi props
	componentDidUpdate(prevProps, prevState) {
		console.log("componentDidUpdate");
	}
}
