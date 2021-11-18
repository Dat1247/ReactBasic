import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { datGheAction } from "../../Redux/actions/BTBookingTicketAction";

class HangGhe extends Component {
	renderGhe = () => {
		return this.props.hangGhe.danhSachGhe.map((ghe, index) => {
			let cssGheDaDat = "";
			let disabled = false;
			//Trạng thái ghế đã được đặt
			if (ghe.daDat) {
				cssGheDaDat = "gheDuocChon";
				disabled = true;
			}

			//Trạng thái ghế đang đặt
			let cssGheDangDat = "";
			let indexGheDaDat = this.props.danhSachGheDaDat.findIndex(
				(item) => item.soGhe === ghe.soGhe
			);
			if (indexGheDaDat !== -1) {
				cssGheDangDat = "gheDangChon";
			}

			return (
				<button
					disabled={disabled}
					className={`ghe ${cssGheDaDat} ${cssGheDangDat}`}
					key={index}
					onClick={() => {
						this.props.datGhe(ghe);
					}}>
					{ghe.soGhe}
				</button>
			);
		});
	};

	renderSoHang = () => {
		return this.props.hangGhe.danhSachGhe.map((ghe, index) => {
			return (
				<button className='rowNumber' key={index}>
					{ghe.soGhe}
				</button>
			);
		});
	};

	renderHangGhe = () => {
		if (this.props.soHangGhe === 0) {
			return (
				<div className='ml-4'>
					{this.props.hangGhe.hang} {this.renderSoHang()}
				</div>
			);
		} else {
			return (
				<div>
					{this.props.hangGhe.hang} {this.renderGhe()}
				</div>
			);
		}
	};

	render() {
		return (
			<div className='text-light text-left ml-5 mt-2' style={{ fontSize: 25 }}>
				{this.renderHangGhe()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		danhSachGheDaDat: state.BTBookingTicketReducer.danhSachGheDaDat,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		datGhe: (ghe) => {
			dispatch(datGheAction(ghe));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HangGhe);
