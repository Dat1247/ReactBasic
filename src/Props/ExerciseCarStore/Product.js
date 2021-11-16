import React, { Component } from "react";

export default class Product extends Component {
	render() {
		let { img, name, price } = this.props.item;
		return (
			<div className='card text-left'>
				<img className='card-img-top' src={img} alt={name} />
				<div className='card-body'>
					<h4 className='card-title'>{name}</h4>
					<p className='card-text'>{price}</p>
					<button
						className='btn btn-success'
						data-toggle='modal'
						data-target='#modelId'
						onClick={() => {
							this.props.xemChiTiet(this.props.item);
						}}>
						Xem chi tiết
					</button>
				</div>
			</div>
		);
	}
}
