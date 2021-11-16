import React, { Component } from "react";
import GioHangRedux from "./GioHangRedux";
import ProductListRedux from "./ProductListRedux";

//import thư viện connect để kết nối component với redux store
import { connect } from "react-redux";

class BTGioHangRedux extends Component {
	tinhTongSoluong = () => {
		return this.props.gioHang.reduce((tongSoLuong, item, index) => {
			return (tongSoLuong += item.soLuong);
		}, 0);
	};
	render() {
		return (
			<div className='container'>
				<h3>Danh sách sản phẩm</h3>
				<div
					style={{ cursor: "pointer" }}
					className='text-right mr-5'
					data-toggle='modal'
					data-target='#modelId'>
					<i className='fa fa-shopping-cart'></i> ({this.tinhTongSoluong()}) Giỏ
					hàng
				</div>
				<ProductListRedux />
				<GioHangRedux />
			</div>
		);
	}
}

//Viết hàm lấy giá trị state từ redux store về biến thành props component
const mapStateToProps = (state) => {
	return {
		gioHang: state.stateGioHang.gioHang,
	};
};

export default connect(mapStateToProps)(BTGioHangRedux);
