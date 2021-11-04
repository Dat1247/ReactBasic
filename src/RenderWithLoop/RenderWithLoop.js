import React, { Component } from "react";

export default class RenderWithLoop extends Component {
	productsList = [
		{
			id: 1,
			name: "black car",
			price: 1000,
			img: "./carbasic/products/black-car.jpg",
		},
		{
			id: 2,
			name: "steel car",
			price: 2000,
			img: "./carbasic/products/steel-car.jpg",
		},
		{
			id: 3,
			name: "silver car",
			price: 3000,
			img: "./carbasic/products/silver-car.jpg",
		},
		{
			id: 4,
			name: "red car",
			price: 4000,
			img: "./carbasic/products/red-car.jpg",
		},
	];

	renderTable = () => {
		// C1: render array with for loop
		// let trComponent = [];
		// for (let i = 0; i < this.productsList.length; i++) {
		// 	let product = this.productsList[i];
		// 	let trJSX = (
		// 		<tr key={i}>
		// 			<td>{product.id}</td>
		// 			<td>{product.name}</td>
		// 			<td>{product.price}</td>
		// 			<td>
		// 				<img
		// 					style={{ width: "250px", height: "150px" }}
		// 					src={product.img}
		// 					alt={product.name}
		// 				/>
		// 			</td>
		// 			<td></td>
		// 		</tr>
		// 	);
		// 	console.log("trJSX", trJSX);
		// 	trComponent.push(trJSX);
		// }

		// render array with map loop
		let trComponent = this.productsList.map((product, index) => {
			return (
				<tr key={index}>
					<td>{product.id}</td>
					<td>{product.name}</td>
					<td>{product.price}</td>
					<td>
						<img
							style={{ width: "250px", height: "150px" }}
							src={product.img}
							alt={product.name}
						/>
					</td>
					<td></td>
				</tr>
			);
		});

		return trComponent;
	};

	render() {
		return (
			<div className='container'>
				<table className='table'>
					<thead>
						<tr>
							<th>id</th>
							<th>name</th>
							<th>price</th>
							<th>image</th>
							<th></th>
						</tr>
					</thead>
					<tbody>{this.renderTable()}</tbody>
				</table>
			</div>
		);
	}
}
