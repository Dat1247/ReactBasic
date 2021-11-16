import React, { Component } from "react";

export default class CartModal extends Component {
	renderCart = () => {
		let { gioHang } = this.props;

		return gioHang.map((item, index) => {
			return (
				<tr key={index}>
					<td>{item.maSP}</td>
					<td>
						<img
							style={{ width: 40, height: 40 }}
							src={item.hinhAnh}
							alt={item.maSP}
						/>
					</td>
					<td>{item.tenSP}</td>
					<td>
						<button
							className='btn btn-success text-center'
							onClick={() => {
								this.props.tangGiamSoLuong(-1, item.maSP);
							}}>
							-
						</button>
						{item.soLuong.toLocaleString()}
						<button
							className='btn btn-success text-center'
							onClick={() => {
								this.props.tangGiamSoLuong(1, item.maSP);
							}}>
							+
						</button>
					</td>
					<td>{item.donGia.toLocaleString()}</td>
					<td>{(item.donGia * item.soLuong).toLocaleString()}</td>
					<td>
						<button
							className='btn btn-danger'
							onClick={() => {
								this.props.xoaGioHang(item.maSP);
							}}>
							Xoá
						</button>
					</td>
				</tr>
			);
		});
	};

	tinhTongTien = () => {
		let { gioHang } = this.props;
		return gioHang.reduce((tongTien, spGioHang, index) => {
			return (tongTien +=
				spGioHang.soLuong * spGioHang.donGia).toLocaleString();
		}, 0);
	};

	render() {
		let { gioHang } = this.props;
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
						style={{ minWidth: 800 }}>
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
									<tbody>{this.renderCart()}</tbody>
									<tfoot>
										<tr>
											<td colSpan='5'></td>
											<td>Tổng tiền: </td>
											<td>{this.tinhTongTien()}</td>
										</tr>
									</tfoot>
								</table>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-secondary'
									data-dismiss='modal'>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
