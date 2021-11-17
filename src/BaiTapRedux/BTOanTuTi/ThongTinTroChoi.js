import React, { Component } from "react";
import { connect } from "react-redux";

class ThongTinTroChoi extends Component {
	render() {
		return (
			<div className='mt-3'>
				<div className='display-4 text-warning'>{this.props.ketQua}</div>
				<div className='display-4 text-success'>
					SỐ BÀN THẮNG:{" "}
					<span className='text-warning'>{this.props.soBanThang}</span>{" "}
				</div>
				<div className='display-4 text-success'>
					TỔNG SỐ BÀN CHƠI:{" "}
					<span className='text-warning'>{this.props.tongSoBanChoi}</span>{" "}
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		ketQua: state.BTOanTuTiReducer.ketQua,
		soBanThang: state.BTOanTuTiReducer.soBanThang,
		tongSoBanChoi: state.BTOanTuTiReducer.soBanChoi,
	};
};

export default connect(mapStateToProps)(ThongTinTroChoi);
