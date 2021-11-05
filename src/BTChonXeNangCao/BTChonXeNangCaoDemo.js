import React, { Component } from "react";
import colorList from "../Data/arrayFeatures.json";
import wheelList from "../Data/wheels.json";

export default class BTChonXeNangCaoDemo extends Component {
	state = {
		carCurrent: {
			id: 1,
			title: "Crystal Black",
			type: "Pearl",
			img: "./images/icons/icon-black.jpg",
			srcImg: "images-black/images-black-1/",
			color: "Black",
			price: "19,550",
			engineType: "In-Line 4-Cylinder",
			displacement: "1996 cc",
			horsepower: "158 @ 6500 rpm",
			torque: "138 lb-ft @ 4200 rpm",
			redline: "6700 rpm",
			wheels: [
				{
					idWheel: 1,
					srcImg: "images-black/images-black-1/",
				},
				{
					idWheel: 2,
					srcImg: "images-black/images-black-2/",
				},
				{
					idWheel: 3,
					srcImg: "images-black/images-black-3/",
				},
			],
		},
	};

	changeCar = (newCar) => {
		this.setState({
			carCurrent: newCar,
		});
	};

	renderColor = () => {
		return colorList.map((item, index) => {
			return (
				<div
					className='row m-2 d-flex align-items-center border border-color-default p-3'
					key={index}>
					<div className='col-2'>
						<img
							style={{ width: "100%", cursor: "pointer" }}
							onClick={() => {
								this.changeCar(item);
							}}
							src={item.img}
							alt={item.id}
						/>
					</div>
					<div className='col-10'>
						<p style={{ fontSize: "18px", fontWeight: "bold" }}>{item.title}</p>
						<span>{item.type}</span>
					</div>
				</div>
			);
		});
	};

	changeWheel = (newWheel) => {
		let obWheel = this.state.carCurrent.wheels.find(
			(item) => item.idWheel === newWheel.idWheel
		);

		if (obWheel !== -1) {
			this.setState({
				carCurrent: { ...this.state.carCurrent, srcImg: obWheel.srcImg },
			});
		}
	};

	renderWheel = () => {
		return wheelList.map((item, index) => {
			return (
				<div
					className='row m-2 d-flex align-items-center border border-color-default p-3'
					key={index}>
					<div className='col-2'>
						<img
							style={{ width: "100%", cursor: "pointer" }}
							onClick={() => {
								this.changeWheel(item);
							}}
							src={item.img}
							alt={item.idWheel}
						/>
					</div>
					<div className='col-10'>
						<p style={{ fontSize: "18px", fontWeight: "bold" }}>{item.title}</p>
					</div>
				</div>
			);
		});
	};

	componentDidMount() {
		// Component tu dong thuc thi khi render duoc goi. Chi chay lan dau tien khi render thuc this
		let tagScript = document.createElement("script");
		tagScript.src =
			"https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/2.7.0/js-cloudimage-360-view.min.js";
		document.querySelector("#appendScript").appendChild(tagScript);
	}

	componentDidUpdate() {
		// Chay lai thu vien khi state thay doi
		document.querySelector("#carCurrent").innerHTML = "";
		let tagScript = document.createElement("script");
		tagScript.src =
			"https://cdn.scaleflex.it/filerobot/js-cloudimage-360-view/v2.0.0.lazysizes.min.js";

		document.querySelector("#appendScript").innerHTML = "";
		document.querySelector("#appendScript").appendChild(tagScript);
	}

	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-6'>
						<div className='model'>
							<div
								style={{ minWidth: "100%" }}
								id='carCurrent'
								className='cloudimage-360'
								data-folder={"./images/" + this.state.carCurrent.srcImg}
								data-filename='civic-{index}.jpg'
								data-amount='8'></div>
						</div>
						<div id='appendScript'></div>
						<div className='card mt-2'>
							<h3 className='card-header text-dark'>Exterior Color</h3>
							<div className='card-body'>
								<table className='table border border-color-light' border='1'>
									<tbody>
										<tr>
											<td>Color</td>
											<td>{this.state.carCurrent.color}</td>
										</tr>
										<tr>
											<td>Price</td>
											<td>{"$" + this.state.carCurrent.price}</td>
										</tr>
										<tr>
											<td>Engine Type</td>
											<td>{this.state.carCurrent.engineType}</td>
										</tr>
										<tr>
											<td>displacement</td>
											<td>{this.state.carCurrent.displacement}</td>
										</tr>
										<tr>
											<td>horsepower</td>
											<td>{this.state.carCurrent.horsepower}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div className='col-6'>
						<div className='card text-left'>
							<h5 className='card-header text-default'>Exterior color</h5>
							<div className='card-body container-fluid'>
								{this.renderColor()}
							</div>
						</div>
						<div className='card text-left mt-4'>
							<h5 className='card-header text-default'>Wheel</h5>
							<div className='card-body container-fluid'>
								{this.renderWheel()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
