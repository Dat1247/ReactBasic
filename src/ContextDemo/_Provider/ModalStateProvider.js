import React, { Component } from "react";
import { ModelContext } from "../_Context/ModelContext";

export default class ModalStateProvider extends Component {
	state = {
		like: 1,
	};

	setLike = () => {
		this.setState({
			like: this.state.like + 1,
		});
	};

	// Từ context sử dụng Provider để chia sẻ state cho các child component
	render() {
		return (
			<ModelContext.Provider
				value={{ stateLike: this.state.like, setLike: this.setLike }}>
				{this.props.children}
			</ModelContext.Provider>
		);
	}
}
