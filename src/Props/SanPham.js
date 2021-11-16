import React, { Component } from "react";

export default class SanPham extends Component {
	render() {
		let { hinhAnh, maSP, tenSP, giaBan } = this.props.sanPham;
		return (
			<div>
				<div className='card text-center'>
					<img
						style={{ width: 250, height: 300, margin: "0 auto" }}
						className='card-img-top'
						src={hinhAnh}
						alt={maSP}
					/>
					<div className='card-body'>
						<h4 className='card-title'>{tenSP}</h4>
						<p className='card-text'>{giaBan.toLocaleString()}</p>
						<button
							className='btn btn-success'
							onClick={() => {
								this.props.xemChiTiet(this.props.sanPham);
							}}>
							Xem chi tiết
						</button>
					</div>
				</div>
			</div>
		);
	}
}
