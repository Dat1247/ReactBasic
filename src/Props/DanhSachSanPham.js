import React, { Component } from "react";
import dataPhone from "../Data/dataPhone.json";
import SanPham from "./SanPham";

export default class DanhSachSanPham extends Component {
	mangSanPham = dataPhone;

	state = {
		sanPhamChiTiet: {
			maSP: 1,
			tenSP: "VinSmart Live",
			manHinh: "AMOLED, 6.2, Full HD+",
			heDieuHanh: "Android 9.0 (Pie)",
			cameraTruoc: "20 MP",
			cameraSau: "Chính 48 MP & Phụ 8 MP, 5 MP",
			ram: "4 GB",
			rom: "64 GB",
			giaBan: 5700000,
			hinhAnh: "./img/vsphone.jpg",
		},
	};

	renderSanPham = () => {
		return this.mangSanPham.map((item, index) => {
			return (
				<div className='col-4' key={index}>
					<SanPham sanPham={item} xemChiTiet={this.xemChiTiet} />
				</div>
			);
		});
	};

	xemChiTiet = (sanPhamChon) => {
		this.setState({
			sanPhamChiTiet: sanPhamChon,
		});
	};

	render() {
		return (
			<div className='container'>
				<h3 className='display-4 text-center'>DANH SÁCH SẢN PHẨM</h3>
				<div className='row'>{this.renderSanPham()}</div>
				<div className='row'>
					<div className='col-4'>
						<h3>{this.state.sanPhamChiTiet.tenSP}</h3>
						<img
							style={{ width: "100%" }}
							src={this.state.sanPhamChiTiet.hinhAnh}
							alt={this.state.sanPhamChiTiet.maSP}
						/>
					</div>
					<div className='col-8'>
						<h3>Thông số kỹ thuật</h3>
						<table class='table'>
							<thead>
								<tr>
									<th>Màn hình</th>
									<th>{this.state.sanPhamChiTiet.manHinh}</th>
								</tr>
								<tr>
									<th>Hệ điều hành</th>
									<th>{this.state.sanPhamChiTiet.heDieuHanh}</th>
								</tr>
								<tr>
									<th>Camera trước</th>
									<th>{this.state.sanPhamChiTiet.cameraTruoc}</th>
								</tr>
								<tr>
									<th>Camera sau</th>
									<th>{this.state.sanPhamChiTiet.cameraSau}</th>
								</tr>
								<tr>
									<th>RAM</th>
									<th>{this.state.sanPhamChiTiet.ram}</th>
								</tr>
								<tr>
									<th>ROM</th>
									<th>{this.state.sanPhamChiTiet.rom}</th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
