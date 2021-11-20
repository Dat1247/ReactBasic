import React, { Component } from "react";
import ModelListProvider from "../_Provider/ModelListProvider";
import ModelList from "./ModelList";
import ProfileModel from "./ProfileModel";

export default class ContextModelList extends Component {
	render() {
		return (
			<ModelListProvider>
				<div className='container'>
					<ProfileModel />
					<ModelList />
				</div>
			</ModelListProvider>
		);
	}
}
