import React, { Component } from "react";
import { connect } from "react-redux";
import { huyGheAction } from "../../Redux/actions/BTBookingTicketAction";
import { HUY_GHE } from "../../Redux/types/BTBookingTicketType";

class ThongTinGhe extends Component {
	render() {
		return (
			<div className='mt-5'>
				<button className='gheDuocChon'></button>{" "}
				<span className='text-light' style={{ fontSize: "20px" }}>
					{" "}
					Ghế đã đặt{" "}
				</span>
				<br />
				<button
					className='gheDangChon'
					style={{ cursor: "no-drop" }}></button>{" "}
				<span className='text-light' style={{ fontSize: "20px" }}>
					Ghế đang chọn
				</span>
				<br />
				<button
					className='ghe'
					style={{ marginLeft: 0, cursor: "no-drop" }}></button>{" "}
				<span className='text-light' style={{ fontSize: "20px" }}>
					Ghế chưa chọn
				</span>
				<div className='mt-5'>
					<table className='table text-light' border='2'>
						<thead>
							<tr style={{ fontSize: "25px", textAlign: "center" }}>
								<th>Số ghế</th>
								<th>Giá</th>
								<th></th>
							</tr>
						</thead>
						<tbody className='text-warning'>
							{this.props.danhSachGheDaDat.map((gheDangDat, index) => {
								return (
									<tr key={index}>
										<td>{gheDangDat.soGhe}</td>
										<td>{gheDangDat.gia}</td>
										<td>
											<button
												className='text-danger'
												onClick={() => {
													this.props.dispatch(huyGheAction(gheDangDat.soGhe));
												}}>
												Hủy
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot>
							<tr style={{ fontSize: "25px" }}>
								<td></td>
								<td>Tổng tiền:</td>
								<td>
									{this.props.danhSachGheDaDat
										.reduce((tongTien, ghe, index) => {
											return (tongTien += ghe.gia);
										}, 0)
										.toLocaleString()}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		danhSachGheDaDat: state.BTBookingTicketReducer.danhSachGheDaDat,
	};
};

export default connect(mapStateToProps)(ThongTinGhe);
