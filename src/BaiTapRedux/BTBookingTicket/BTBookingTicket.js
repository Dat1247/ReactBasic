import React, { Component } from "react";
import "./BaiTapBookingTicket.css";
import ThongTinGhe from "./ThongTinGhe";
import danhSachGheData from "../../Data/danhSachGhe.json";
import HangGhe from "./HangGhe";

export default class BTBookingTicket extends Component {
	renderHangGhe = () => {
		return danhSachGheData.map((hangGhe, index) => {
			return (
				<div key={index} style={{ width: "80%" }}>
					<HangGhe hangGhe={hangGhe} soHangGhe={index} />
				</div>
			);
		});
	};

	render() {
		return (
			<div
				className='bookingMovie'
				style={{
					position: "fixed",
					width: "100%",
					height: "100%",
					backgroundImage: "url('./book_ticket/bgmovie.jpg')",
					backgroundSize: "cover",
				}}>
				<div
					style={{
						backgroundColor: "rgba(0,0,0,0.8)",
						width: "100%",
						height: "100%",
					}}>
					<div className='container-fluid'>
						<div className='row'>
							<div className='col-8'>
								<div
									className='text-light text-center mt-3'
									style={{ fontSize: "30px" }}>
									ĐẶT VÉ XEM PHIM CYBERLEARN
								</div>
								<div className='d-flex flex-column align-items-center mt-3'>
									<div className='text-light'>MÀN HÌNH</div>
									<div className='screen'></div>
									{this.renderHangGhe()}
								</div>
							</div>
							<div className='col-4'>
								<div
									className='text-light text-center mt-3'
									style={{ fontSize: "30px" }}>
									DANH SÁCH GHẾ BẠN CHỌN
								</div>
								<ThongTinGhe />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
