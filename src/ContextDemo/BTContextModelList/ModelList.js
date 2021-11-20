import React, { Component } from "react";
import { ModelListContext } from "../_Context/ModelListContext";
import ModelListProvider from "../_Provider/ModelListProvider";
import ModelItem from "./ModelItem";

export default class ModelList extends Component {
	render() {
		return (
			<ModelListContext.Consumer>
				{(value) => {
					return (
						<div>
							<h3>Danh sách Idol</h3>
							<div className='row'>
								{value.modelListState.map((model, index) => {
									return (
										<div className='col-3' key={index}>
											<ModelItem modelItem={model} />
										</div>
									);
								})}
							</div>
						</div>
					);
				}}
			</ModelListContext.Consumer>
		);
	}
}
