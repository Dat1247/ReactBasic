import React, { Component, PureComponent } from "react";

export default class Profile extends PureComponent {
	render() {
		console.log("load");
		return (
			<div>
				<div className='card text-white bg-dark' style={{ width: "250px" }}>
					<img
						style={{ width: "100%" }}
						className='card-img-top'
						src='https://2sao.vietnamnetjsc.vn/images/2020/04/26/22/01/midu-01.jpg'
						alt='midu'
					/>
					<div className='card-body'>
						<h4 className='card-title'>Title</h4>
						<p className='card-text'>{this.props.like.soLuong}</p>
					</div>
				</div>
			</div>
		);
	}
}
