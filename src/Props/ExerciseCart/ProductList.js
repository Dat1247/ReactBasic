import React, { Component } from "react";
import dataPhone from "../../Data/dataPhone.json";
import ProductItem from "./ProductItem";

export default class ProductList extends Component {
	mangSanPham = dataPhone;

	renderSanPham = () => {
		return this.mangSanPham.map((item, index) => {
			return (
				<div className='col-4' key={index}>
					<ProductItem sanPham={item} themGioHang={this.props.themGioHang} />
				</div>
			);
		});
	};

	render() {
		return (
			<div className='container'>
				<h3 className='text-center'>Danh Sách Sản Phẩm</h3>

				<div className='row'>{this.renderSanPham()}</div>
			</div>
		);
	}
}
