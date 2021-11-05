import React, { Component } from "react";
import glassesList from "../Data/DataGlasses.json";

export default class BTThuKinhDemo extends Component {
	state = {
		currentGlass: {
			id: "",
			price: "",
			name: "",
			url: "",
			desc: "",
		},
	};

	changeGlasses = (newGlasses) => {
		this.setState({
			currentGlass: newGlasses,
		});
	};

	renderGlass = () => {
		const hoverGlass = {
			width: "110px",
			cursor: "pointer",
		};
		return glassesList.map((item, index) => {
			return (
				<img
					className='p-3'
					style={hoverGlass}
					onClick={() => {
						this.changeGlasses(item);
					}}
					key={index}
					src={item.url}
					alt={item.id}
				/>
			);
		});
	};

	render() {
		const keyFrame1 = `@keyframes animationChange${Date.now()} {
            from {
                width: 0;
                transform: rotate(-45deg);
                opacity: 0
            }
            to {
                width: 140px;
                transform: rotate(0deg);
                opacity: 0.7
            }
        }`;

		const keyFrame2 = `@keyframes animaInfo${Date.now()} {
            from {
                width: 0;
                transform: rotate(-45deg);
                opacity: 0
            }
            to {
                width: 250px;
                transform: rotate(0deg);
                opacity: 0.7
            }
        }`;

		const styleGlasses = {
			width: "140px",
			left: "200px",
			top: "75px",
			opacity: 0.7,
			transform: "rotate(0deg)",
			animation: `animationChange${Date.now()} 1s`,
		};

		return (
			<div
				style={{
					backgroundImage: "url(./glassImage/background.jpg)",
					backgroundSize: "cover",
					minHeight: "1000px",
				}}>
				<style>{keyFrame1}</style>
				<style>{keyFrame2}</style>
				<div
					className=''
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						minHeight: "1000px",
					}}>
					<h3
						style={{ backgroundColor: "rgba(148, 0, 201, 0.8)" }}
						className='p-5 text-uppercase text-center'>
						try glasses app online
					</h3>
					<div className='container'>
						<div className='row text-center mt-5'>
							<div className='col-6'>
								<div className='position-relative'>
									<img
										style={{ width: "250px" }}
										src='./glassImage/model.jpg'
										alt='model 1'
									/>

									<img
										style={styleGlasses}
										className='position-absolute'
										src={this.state.currentGlass.url}
										alt={this.state.currentGlass.id}
									/>
									<div
										style={{
											backgroundColor: "rgba(255, 127, 0, 0.5)",
											width: "250px",
											height: "105px",
											bottom: 0,
											right: "145px",
											opacity: 0.7,
											transform: "rotate(0deg)",
											animation: `animaInfo${Date.now()} 1s`,
										}}
										className='position-absolute text-left p-2'>
										<p style={{ fontSize: "17px", fontWeight: "bold" }}>
											{this.state.currentGlass.name}
										</p>
										<span style={{ fontSize: "13px" }}>
											{this.state.currentGlass.desc}
										</span>
									</div>
								</div>
							</div>
							<div className='col-6'>
								<img
									style={{ width: "250px" }}
									src='./glassImage/model.jpg'
									alt='model 2'
								/>
							</div>
						</div>
						<div className='row bg-light text-center m-5 d-flex justify-content-center'>
							{this.renderGlass()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
