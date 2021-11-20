import React, { Component } from "react";
import Profile from "./Profile";

export default class DemoPureComponent extends Component {
	state = {
		like: { soLuong: 0 },
	};

	likeImage = () => {
		let likeHienTai = this.state.like;
		likeHienTai.soLuong += 1;
		this.setState({
			like: likeHienTai,
		});
	};

	render() {
		return (
			<div>
				<div className='container'>
					<h3>Profile</h3>
					<Profile like={this.state.like} />
					<br />
					<div className='card text-white bg-secondary p-5'>
						Số lượt like ({this.state.like.soLuong})
						<div className='card-body'>
							<button
								onClick={() => {
									this.likeImage();
								}}>
								Like <i className='fa fa-thumbs-up'></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
