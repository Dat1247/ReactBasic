import React, { Component } from "react";
import { connect } from "react-redux";

class Player extends Component {
	render() {
		return (
			<div className='d-flex align-items-center flex-column mt-4'>
				<div className='theThink d-flex align-items-center justify-content-center'>
					<img
						style={{ width: 70, height: 70 }}
						src={
							this.props.mangDatCuoc.find((item) => item.datCuoc === true)
								.hinhAnh
						}
						alt={
							this.props.mangDatCuoc.find((item) => item.datCuoc === true).ma
						}
					/>
				</div>
				<div className='speech-bubble'></div>
				<img
					style={{ width: 150, height: 150 }}
					src='./game_oan_tu_ti/player.png'
					alt='player'
				/>
				<div className='row'>
					{this.props.mangDatCuoc.map((item, index) => {
						let border = {};
						if (item.datCuoc) {
							border = { border: "3px solid orange" };
						}
						return (
							<div className='col-4' key={index}>
								<button
									className='btnChoose'
									style={border}
									onClick={() => {
										this.props.datCuoc(item.ma);
									}}>
									<img
										style={{ width: "45px", height: "45px" }}
										src={item.hinhAnh}
										alt={item.ma}
									/>
								</button>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		mangDatCuoc: state.BTOanTuTiReducer.mangDatCuoc,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		datCuoc: (maCuoc) => {
			dispatch({
				type: "CHON_KEO_BUA_BAO",
				maCuoc,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
