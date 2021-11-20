import React, { Component } from "react";
import { ModelListContext } from "../_Context/ModelListContext";

export default class ProfileModel extends Component {
	render() {
		return (
			<ModelListContext.Consumer>
				{(value) => {
					let activeModel = value.modelListState.find(
						(item) => item.active === true
					);
					return (
						<div>
							<h3>Thông tin Idol</h3>
							<div className='card text-left' style={{ width: 350 }}>
								<img
									className='card-img-top'
									src={activeModel.img}
									alt={activeModel.name}
								/>
								<div className='card-body'>
									<h4 className='card-title'>Họ tên: {activeModel.name}</h4>
									<p className='card-text'>Tuổi: {activeModel.age}</p>
									<p className='card-text'>
										Lượt thích: {activeModel.like}{" "}
										<i className='fa fa-heart' style={{ color: "red" }}></i>{" "}
									</p>
								</div>
							</div>
						</div>
					);
				}}
			</ModelListContext.Consumer>
		);
	}
}
