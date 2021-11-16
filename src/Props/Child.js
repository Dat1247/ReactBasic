import React, { Component } from "react";

export default class Child extends Component {
	renderSize = () => {
		let { size } = this.props.productItem;
		return size.map((size, index) => {
			return (
				<button
					key={index}
					onClick={() => {
						this.props.showAlert(size);
					}}>
					{size}
				</button>
			);
		});
	};
	render() {
		let { src, name, size } = this.props.productItem;
		return (
			<div>
				{/* <img style={{ width: 150 }} src={src} alt={name} /> */}
				<div style={{ width: 225 }} className='card text-left'>
					<img className='card-img-top' src={src} alt={name} />
					<div className='card-body'>
						<h4 className='card-title'>{name}</h4>
						{this.renderSize()}
					</div>
				</div>
			</div>
		);
	}
}
