import React, { Component } from "react";
import CartModal from "./CartModal";
import ProductList from "./ProductList";

export default class ExerciseCart extends Component {
	state = {
		gioHang: [],
	};

	themGioHang = (sp) => {
		console.log(sp);
		let spGioHang = {
			maSP: sp.maSP,
			tenSP: sp.tenSP,
			donGia: sp.giaBan,
			soLuong: 1,
			hinhAnh: sp.hinhAnh,
		};

		//Kiem tra san pham da co trong gio hang chua
		let index = this.state.gioHang.findIndex(
			(spGH) => spGH.maSP === spGioHang.maSP
		);

		if (index != -1) {
			this.state.gioHang[index].soLuong += 1;
		} else {
			this.state.gioHang.push(spGioHang);
		}

		//push vao gio hang
		// let gioHangCapNhat = [...this.state.gioHang, spGioHang];

		this.setState({
			gioHang: this.state.gioHang,
		});
	};

	xoaGioHang = (maSP) => {
		console.log(maSP);

		let index = this.state.gioHang.findIndex(
			(spGioHang) => spGioHang.maSP === maSP
		);
		if (index != -1) {
			this.state.gioHang.splice(index, 1);
		}

		this.setState({
			gioHang: this.state.gioHang,
		});
	};

	tinhTongSoluong = () => {
		// let tongSoLuong = 0;
		// for (let i = 0; i < this.state.gioHang.length; i++) {
		// 	let spGioHang = this.state.gioHang[i];
		// 	tongSoLuong += spGioHang.soLuong;
		// }
		// return tongSoLuong;

		return this.state.gioHang.reduce((tongSoLuong, spGioHang, index) => {
			return (tongSoLuong += spGioHang.soLuong);
		}, 0);
	};

	tangGiamSoLuong = (number, maSP) => {
		let gioHang = [...this.state.gioHang];
		let index = gioHang.findIndex((spGioHang) => spGioHang.maSP === maSP);

		if (index !== -1) {
			if (gioHang[index].soLuong <= 1 && number === -1) {
				alert("Số lượng tối thiểu ít nhất là 1!");
				return;
			}
			gioHang[index].soLuong += number;
		}

		this.setState({
			gioHang: gioHang,
		});
	};

	render() {
		return (
			<div className='container-fluid'>
				<h3 className='text-center'>Bài tập giỏ hàng</h3>
				<div
					style={{ cursor: "pointer" }}
					className='text-right mr-5'
					data-toggle='modal'
					data-target='#modelId'>
					<i className='fa fa-shopping-cart'></i> ({this.tinhTongSoluong()}) Giỏ
					hàng
				</div>
				<CartModal
					gioHang={this.state.gioHang}
					xoaGioHang={this.xoaGioHang}
					tangGiamSoLuong={this.tangGiamSoLuong}
				/>
				<ProductList themGioHang={this.themGioHang} />
			</div>
		);
	}
}
