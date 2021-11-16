import React, { Component } from "react";
import dataPhone from "../Data/dataPhone.json";
import ProductItemRedux from "./ProductItemRedux";

export default class ProductListRedux extends Component {
	mangSanPham = dataPhone;

	renderProductItem = () => {
		return this.mangSanPham.map((product, index) => {
			return (
				<div className='col-4' key={index}>
					<ProductItemRedux product={product} />
				</div>
			);
		});
	};

	render() {
		return <div className='row'>{this.renderProductItem()}</div>;
	}
}
