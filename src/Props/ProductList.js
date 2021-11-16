import React, { Component } from "react";
import ProductItem from "./ProductItem";

export default class ProductList extends Component {
	renderProductItem = () => {
		return this.props.arrProduct.map((item, index) => {
			return (
				<div key={index} className='col-4 mt-3 w3-animate-zoom'>
					<ProductItem dataProductItem={item} />
				</div>
			);
		});
	};

	render() {
		console.log(this.props.arrProduct);

		return <div className='row'>{this.renderProductItem()}</div>;
	}
}
