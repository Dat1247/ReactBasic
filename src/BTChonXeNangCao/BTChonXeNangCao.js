import React, { Component } from "react";
import "./BaiTapChonXeNangCao.css";
//Import mang du lieu cac model xe
import dataFeatures from "../Data/arrayFeatures.json";
import dataWheel from "../Data/wheels.json";

export default class BTChonXeNangCao extends Component {
	//Tao ra 1 state
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

	renderIcon = () => {
		return dataFeatures.map((item, index) => {
			return (
				<div
					style={{ cursor: "pointer" }}
					className='row mt-1 border border-color-default m-3'
					key={index}
					onClick={() => {
						this.changeCar(item);
					}}>
					<div className='col-2'>
						<img
							className='p-2'
							style={{ width: "100%" }}
							src={item.img}
							alt={index}
						/>
					</div>
					<div className='col-10'>
						<h5 className='p-3'>{item.title}</h5>
						<span className='p-3'>{item.type}</span>
					</div>
				</div>
			);
		});
	};

	changeWheel = (newWheel) => {
		//Tim trong state hien tai
		let obWheel = this.state.carCurrent.wheels.find(
			(item) => item.idWheel === newWheel.idWheel
		);

		if (obWheel !== -1) {
			// Lay ra source hinh anh
			this.setState({
				carCurrent: {
					...this.state.carCurrent,
					srcImg: obWheel.srcImg,
				},
			});
		}
	};

	renderWheel = () => {
		return dataWheel.map((item, index) => {
			return (
				<div
					onClick={() => {
						this.changeWheel(item);
					}}
					className='row mt-1 border border-color-default m-3'
					key={index}>
					<div className='col-2'>
						<img
							className='p-2'
							style={{ width: "100%" }}
							src={item.img}
							alt={index}
						/>
					</div>
					<div className='col-10 d-flex align-items-center'>
						<span className='p-3'>{item.title}</span>
					</div>
				</div>
			);
		});
	};

	componentDidMount = () => {
		//Day la phuong thuc co san cua component tu dong thuc thi  sau khi render duoc goi. Luu y: componentDidMount chi chay 1 lan dau tien sau khi render thuc thi

		let tagScript = document.createElement("script");
		tagScript.src =
			"https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/2.7.0/js-cloudimage-360-view.min.js";

		document.querySelector("#appendScript").appendChild(tagScript);
	};

	componentDidUpdate = () => {
		//Ham nay chay sau khi state thay doi (tu kich hoat sau render)
		//Luu y: khong duoc phep setState tai component nay vi infinity loop

		//Clear anh cu
		document.querySelector("#carCurrent").innerHTML = "";

		let tagScript = document.createElement("script");
		tagScript.src =
			"https://cdn.scaleflex.it/filerobot/js-cloudimage-360-view/v2.0.0.lazysizes.min.js";

		//Clear script cu truoc khi append script moi cua thu vien vao
		document.querySelector("#appendScript").innerHTML = "";

		document.querySelector("#appendScript").appendChild(tagScript);
	};

	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-6'>
						<div className='model'>
							{/* <img
								style={{ width: "100%" }}
								src='./images/images-black/images-black-1/civic-1.jpg'
								alt='xe'
							/> */}
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
							<table className='table border border-color-light' border='1'>
								<tbody>
									<tr>
										<td>Color</td>
										<td>Black</td>
									</tr>
									<tr>
										<td>Price</td>
										<td>$ 19.000,00</td>
									</tr>
									<tr>
										<td>Engine Type</td>
										<td>In-line-4-cylinder</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className='col-6'>
						<div className='card text-left'>
							<h5 className='card-header text-default'>Exterior color</h5>
							<div className='container-fluid'>{this.renderIcon()}</div>
						</div>
						<div className='card text-left mt-2'>
							<h5 className='card-header text-default'>Wheel</h5>
							<div className='container-fluid'>{this.renderWheel()}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
