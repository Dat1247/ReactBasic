import React, { Component } from "react";
import { ModelListContext } from "../_Context/ModelListContext";
import modelList from "../../Data/dataModel.json";

export default class ModelListProvider extends Component {
	modelList = modelList;
	state = {
		modelListState: this.modelList,
	};

	setActiveModel = (id) => {
		let modelListStateUpdate = this.state.modelListState.map((model, index) => {
			if (model.id === id) {
				model.like += 1;
				model.active = true;
			} else {
				model.active = false;
			}
			return { ...model };
		});
		this.setState({
			modelListState: modelListStateUpdate,
		});
	};

	render() {
		// console.log(this.state.modelListState);
		return (
			<ModelListContext.Provider
				value={{
					modelListState: this.state.modelListState,
					setActiveModel: this.setActiveModel,
				}}>
				{this.props.children}
			</ModelListContext.Provider>
		);
	}
}
