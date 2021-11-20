import React, { Component } from "react";
import { ModelListContext } from "../_Context/ModelListContext";

export default class ModelItem extends Component {
	render() {
		let { modelItem } = this.props;
		return (
			<ModelListContext.Consumer>
				{(value) => {
					return (
						<div>
							<div className='card text-left' style={{ maxHeight: 300 }}>
								<img
									style={{ height: "100%" }}
									className='card-img-top'
									src={modelItem.img}
									alt={modelItem.name}
								/>
								<div className='card-body'>
									<h4 className='card-title'>Họ tên: {modelItem.name}</h4>
									<p className='card-text'>Tuổi: {modelItem.age}</p>
									<button
										style={{
											background: "none",
											border: "1px solid red",
											borderRadius: "5px",
										}}
										onClick={() => {
											value.setActiveModel(modelItem.id);
										}}>
										{modelItem.like}{" "}
										<i className='fa fa-heart' style={{ color: "red" }}></i>{" "}
									</button>
								</div>
							</div>
						</div>
					);
				}}
			</ModelListContext.Consumer>
		);
	}
}
