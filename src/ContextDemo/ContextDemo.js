import React, { Component } from "react";
import LikeProfile from "./LikeProfile";
import ModelProfile from "./ModelProfile";
import ModalStateProvider from "./_Provider/ModalStateProvider";

export default class ContextDemo extends Component {
	render() {
		return (
			<ModalStateProvider>
				<div className='container'>
					<ModelProfile />
					<LikeProfile />
				</div>
			</ModalStateProvider>
		);
	}
}
