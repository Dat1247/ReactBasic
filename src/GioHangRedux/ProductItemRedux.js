import React, { Component } from "react";

import { connect } from "react-redux";

class ProductItemRedux extends Component {
	render() {
		let { product } = this.props;
		return (
			<div className='card text-left mt-3'>
				<img
					style={{ width: "250px", height: "300px", margin: "0 auto" }}
					className='card-img-top'
					src={product.hinhAnh}
					alt={product.tenSP}
				/>
				<div className='card-body'>
					<h4 className='card-title'>{product.tenSP}</h4>
					<p className='card-text'>{product.giaBan.toLocaleString()}</p>
					<button
						className='btn btn-success'
						onClick={() => {
							this.props.themGioHang(product);
						}}>
						Thêm giỏ hàng
					</button>
				</div>
			</div>
		);
	}
}

// Hàm gửi dữ liệu lên store
const mapDispatchToProps = (dispatch) => {
	return {
		themGioHang: (sanPham) => {
			//Tạo sản phẩm giỏ hàng
			let spGioHang = {
				maSP: sanPham.maSP,
				tenSP: sanPham.tenSP,
				soLuong: 1,
				giaBan: sanPham.giaBan,
				hinhAnh: sanPham.hinhAnh,
			};
			// console.log(spGioHang);
			let action = {
				type: "THEM_GIO_HANG", //Thuộc tính bắt buộc của action
				spGioHang,
			};

			// Dùng hàm dispatch từ redux để gửi dữ liệu lên reducer
			dispatch(action);
		},
	};
};

export default connect(null, mapDispatchToProps)(ProductItemRedux);
