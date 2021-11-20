import React, { Component } from "react";
import { ModelContext } from "./_Context/ModelContext";

export default class LikeProfile extends Component {
	render() {
		return (
			<ModelContext.Consumer>
				{(value) => {
					return (
						<div className='mt-5'>
							<div
								className='card text-white bg-default text-dark'
								style={{ width: 300 }}>
								<div className='card-body'>
									<button
										className='card-title'
										style={{ color: "red" }}
										onClick={() => {
											value.setLike();
										}}>
										{value.stateLike} Like <i className='fa fa-heart'></i>
									</button>
								</div>
							</div>
						</div>
					);
				}}
			</ModelContext.Consumer>
		);
	}
}
