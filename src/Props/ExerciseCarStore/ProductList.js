import React, { Component } from "react";
import Product from "./Product";

export default class ProductList extends Component {
	renderProductItem = () => {
		return this.props.productsData.map((item, index) => {
			return (
				<div className='col-3' key={index}>
					<Product item={item} xemChiTiet={this.props.xemChiTiet} />
				</div>
			);
		});
	};

	render() {
		return (
			<div className='container'>
				<div className='row'>{this.renderProductItem()}</div>
			</div>
		);
	}
}
