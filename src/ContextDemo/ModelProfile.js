import React, { Component } from "react";
import { ModelContext } from "./_Context/ModelContext";

export default class ModelProfile extends Component {
	render() {
		return (
			<ModelContext.Consumer>
				{(value) => {
					return (
						<div className=' mt-5'>
							<h3>Profile</h3>
							<div className='card text-white bg-dark' style={{ width: 300 }}>
								<img
									className='card-img-top'
									src='https://www.elle.vn/wp-content/uploads/2018/08/13/Tr%C6%B0%C6%A1ng-Gia-Ngh%C3%AA-2.jpg'
									alt='truong gia nghe'
								/>
								<div className='card-body'>
									<h4 className='card-title'>Tên: Trương Gia Nghê</h4>
									<p className='card-text'>Tuổi: ...</p>
									<span className='' style={{ color: "pink" }}>
										{value.stateLike} <i className='fa fa-heart'></i>
									</span>
								</div>
							</div>
						</div>
					);
				}}
			</ModelContext.Consumer>
		);
	}
}
