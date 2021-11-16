import React, { Component } from "react";
import Modal from "./Modal";
import ProductList from "./ProductList";

export default class ExerciseCarStore extends Component {
	products = [
		{ id: 1, name: "black car", img: "./images/black-car.jpg", price: 1000 },
		{ id: 2, name: "red car", img: "./images/red-car.jpg", price: 2000 },
		{ id: 3, name: "silver car", img: "./images/silver-car.jpg", price: 3000 },
		{ id: 3, name: "Steel car", img: "./images/steel-car.jpg", price: 4000 },
	];

	state = {
		productDetail: {
			id: 1,
			name: "black car",
			img: "./images/black-car.jpg",
			price: 1000,
		},
	};

	xemChiTiet = (newProduct) => {
		this.setState({
			productDetail: newProduct,
		});
	};

	render() {
		return (
			<div>
				<h3 className='text-center display-4'>Danh sách xe</h3>
				<Modal content={this.state} />
				<ProductList
					productsData={this.products}
					xemChiTiet={this.xemChiTiet}
				/>
			</div>
		);
	}
}
