import React, { Component } from "react";
import dataGlasses from "../Data/DataGlasses.json";

export default class BTThuKinh extends Component {
	state = {
		glassesCurrent: {
			id: "",
			price: "",
			name: "",
			url: "",
			desc: "",
		},
	};

	renderGlasses = () => {
		return dataGlasses.map((glasses, index) => {
			return (
				<img
					className='ml-2 p-2 border border-width-1'
					style={{ width: "110px", cursor: "pointer" }}
					onClick={() => {
						this.changeGlasses(glasses);
					}}
					key={index}
					src={glasses.url}
					alt={glasses.name}
				/>
			);
		});
	};

	changeGlasses = (newGlasses) => {
		this.setState({
			glassesCurrent: newGlasses,
		});
	};

	render() {
		const keyFrame = `@keyframes animaChange${Date.now()} {
            from {
                width: 0;
                transform: rotate(45deg);
                opacity: 0
            }
            to {
                width: 150px;
                transform: rotate(0deg);
                opacity: 0.7
            }
        }`;

		const styleGlasses = {
			width: "150px",
			top: "75px",
			right: "70px",
			opacity: 0.8,
			transform: "rotate(0deg)",
			animation: `animaChange${Date.now()} 1s`,
		};
		const infoGlasses = {
			width: "250px",
			left: "270px",
			top: "200px",
			backgroundColor: "rgba(255, 127, 0, 0.5)",
			textAlign: "left",
			paddingLeft: "15px",
			height: "105px",
		};
		return (
			<div
				style={{
					backgroundImage: "url(./glassImage/background.jpg)",
					backgroundSize: "cover",
					minHeight: "1000px",
				}}>
				<style>{keyFrame}</style>
				<div
					className=''
					style={{ backgroundColor: "rgba(0,0,0,0.5)", minHeight: "1000px" }}>
					<h3
						className='text-center text-light p-5'
						style={{ backgroundColor: "rgba(148, 0, 201, 0.8)" }}>
						TRY GLASSES APP ONLINE
					</h3>
					<div className='container'>
						<div className='row mt-5 text-center'>
							<div className='col-6'>
								<div className='position-relative'>
									<img
										className='position-absolute'
										style={{ width: "250px" }}
										src='./glassImage/model.jpg'
										alt='model'
									/>
									<img
										style={styleGlasses}
										className='position-absolute'
										src={this.state.glassesCurrent.url}
										alt={this.state.glassesCurrent.id}
									/>
									<div className='position-absolute' style={infoGlasses}>
										<span
											style={{ color: "#AB82FF", fontSize: "17px" }}
											className='font-weight-bold'>
											{this.state.glassesCurrent.name}
										</span>{" "}
										<br />
										<span style={{ fontSize: "13px", fontWeight: "300" }}>
											{this.state.glassesCurrent.desc}
										</span>
									</div>
								</div>
							</div>
							<div className='col-6'>
								<img
									style={{ width: "250px" }}
									src='./glassImage/model.jpg'
									alt='model'
								/>
							</div>
						</div>
					</div>
					<div className='bg-light mt-5 text-center container d-flex justify-content-center p-5'>
						{this.renderGlasses()}
					</div>
				</div>
			</div>
		);
	}
}
