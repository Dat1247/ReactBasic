import React, { Component } from "react";

export default class ProductItem extends Component {
	render() {
		let { sanPham } = this.props;

		return (
			<div>
				<div className='card text-center'>
					<img
						style={{ width: "250px", height: "300px", margin: "0 auto" }}
						className='card-img-top'
						src={sanPham.hinhAnh}
						alt={sanPham.tenSP}
					/>
					<div className='card-body'>
						<h4 className='card-title'>{sanPham.tenSP}</h4>
						<p className='card-text'>{sanPham.giaBan.toLocaleString()}</p>
						<button
							onClick={() => {
								this.props.themGioHang(sanPham);
							}}
							className='btn btn-success'>
							Thêm vào giỏ hàng
						</button>
					</div>
				</div>
			</div>
		);
	}
}
