import React, { Component } from "react";

// Sử dụng thư viện connect để lấy dữ liệu từ store về
import { connect } from "react-redux";

class GioHangRedux extends Component {
	render() {
		// console.log(this.props.gioHang);

		return (
			<div>
				{/* Modal */}
				<div
					className='modal fade'
					id='modelId'
					tabIndex={-1}
					role='dialog'
					aria-labelledby='modelTitleId'
					aria-hidden='true'>
					<div
						className='modal-dialog'
						role='document'
						style={{ minWidth: 1000 }}>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5 className='modal-title'>Giỏ hàng</h5>
								<button
									type='button'
									className='close'
									data-dismiss='modal'
									aria-label='Close'>
									<span aria-hidden='true'>×</span>
								</button>
							</div>
							<div className='modal-body'>
								<table className='table'>
									<thead>
										<tr>
											<th>Mã sản phẩm</th>
											<th>Hình ảnh</th>
											<th>Tên sản phẩm</th>
											<th>Số lượng</th>
											<th>Đơn giá</th>
											<th>Thành tiền</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{this.props.gioHang.map((spGH, index) => {
											return (
												<tr key={index}>
													<td>{spGH.maSP}</td>
													<td>
														<img
															src={spGH.hinhAnh}
															alt={spGH.tenSP}
															width={50}
															height={50}
														/>
													</td>
													<td>{spGH.tenSP}</td>
													<td>
														<button
															className='btn btn-warning'
															onClick={() => {
																this.props.tangGiamSoLuong(spGH.maSP, false);
															}}>
															-
														</button>
														{spGH.soLuong}
														<button
															className='btn btn-warning'
															onClick={() => {
																this.props.tangGiamSoLuong(spGH.maSP, true);
															}}>
															+
														</button>
													</td>
													<td>{spGH.giaBan.toLocaleString()}</td>
													<td>
														{(spGH.soLuong * spGH.giaBan).toLocaleString()}
													</td>
													<td>
														<button
															className='btn btn-danger'
															onClick={() => {
																this.props.xoaGioHang(spGH.maSP);
															}}>
															Xóa
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
									<tfoot>
										<tr>
											<td colSpan='5'></td>
											<td>Tổng tiền: </td>
											<td>
												{this.props.gioHang
													.reduce((tongTien, item, index) => {
														return (tongTien += item.soLuong * item.giaBan);
													}, 0)
													.toLocaleString()}
											</td>
										</tr>
									</tfoot>
								</table>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-secondary'
									data-dismiss='modal'>
									Đóng
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// Hàm lấy state redux biến đổi hành props của component
const mapStateToProps = (state) => {
	//state là state tổng của ứng dụng chứa các state con (rootReducer)
	return {
		gioHang: state.stateGioHang.gioHang,
	};
};

// Hàm đưa dữ liệu lên reducer
const mapDispatchToProps = (dispatch) => {
	return {
		xoaGioHang: (maSP) => {
			//Tạo action
			let action = {
				type: "XOA_GIO_HANG",
				maSP,
			};
			//Dùng phương thức dispatch redux cung cấp để đưa dữ liệu lên reducer
			console.log(maSP);
			dispatch(action);
		},
		tangGiamSoLuong: (maSP, tangGiam) => {
			//tangGiam = true => Xử lý tăng - tangGiam = false => Xử lý giảm
			//Tạo action để đưa dữ liệu lên reducer
			let action = {
				type: "TANG_GIAM_SO_LUONG", //Thuộc tính bắt buộc để biết chạy vào case nào trong tất cả reducer
				maSP,
				tangGiam,
			};

			//Đưa action lên reducer mỗi lần người dùng click vào
			dispatch(action);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GioHangRedux);
