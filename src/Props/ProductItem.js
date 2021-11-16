import React, { Component } from "react";

export default class ProductItem extends Component {
	render() {
		let { image, name, price } = this.props.dataProductItem;
		return (
			<div>
				<div className='card' style={{ width: "300px" }}>
					<img className='card-img-top' src={image} alt={name} />
					<div className='card-body'>
						<h4 className='card-title'>{name}</h4>
						<p className='card-text'> {"$" + price}</p>
						<button className='w3-button w3-black text-white'>
							View detail
						</button>
					</div>
				</div>
			</div>
		);
	}
}
