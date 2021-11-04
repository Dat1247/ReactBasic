import React, { Component } from "react";

export default class BaiTapChonXe extends Component {
	state = {
		imgProduct: require("../assets/products/black-car.jpg").default,
	};

	renderCar = (imgNew) => {
		//Tao 1 state moi
		let newState = {
			imgProduct: imgNew,
		};

		this.setState(newState);
	};

	render() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-7'>
						<img
							style={{ width: "100%" }}
							src={this.state.imgProduct}
							alt='black car'
						/>
					</div>
					<div className='col-5'>
						<div className='card text-dark'>
							<div className='card-header text-primary'>Exterior Color</div>
							<div className='card-body'>
								<div className='row border border-light pt-2 pb-2 mt-2'>
									<img
										className='col-2'
										onClick={() => {
											this.renderCar(
												require("../assets/products/black-car.jpg").default
											);
										}}
										style={{ width: "100%", height: "100%", cursor: "pointer" }}
										src={require("../assets/icons/icon-black.jpg").default}
										alt='black icon'
									/>
									<div className='col-10'>
										<h3>Crystal Black</h3>
										<p>Pearl</p>
									</div>
								</div>
								<div className='row border border-light pt-2 pb-2 mt-2'>
									<img
										className='col-2'
										onClick={() => {
											this.renderCar(
												require("../assets/products/steel-car.jpg").default
											);
										}}
										style={{ width: "100%", height: "100%", cursor: "pointer" }}
										src={require("../assets/icons/icon-steel.jpg").default}
										alt='steel icon'
									/>
									<div className='col-10'>
										<h3>Modern Steel</h3>
										<p>Metallic</p>
									</div>
								</div>
								<div className='row border border-light pt-2 pb-2 mt-2'>
									<img
										className='col-2'
										onClick={() => {
											this.renderCar(
												require("../assets/products/silver-car.jpg").default
											);
										}}
										style={{ width: "100%", height: "100%", cursor: "pointer" }}
										src={require("../assets/icons/icon-silver.jpg").default}
										alt='silver icon'
									/>
									<div className='col-10'>
										<h3>Luna Silver</h3>
										<p>Metallic</p>
									</div>
								</div>
								<div className='row border border-light pt-2 pb-2 mt-2'>
									<img
										className='col-2'
										onClick={() => {
											this.renderCar(
												require("../assets/products/red-car.jpg").default
											);
										}}
										style={{ width: "100%", height: "100%", cursor: "pointer" }}
										src={require("../assets/icons/icon-red.jpg").default}
										alt='red icon'
									/>
									<div className='col-10'>
										<h3>Rallye Red</h3>
										<p>Metallic</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
