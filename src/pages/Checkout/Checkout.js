import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layChiTietPhongVeAction } from "../../redux/actions/QuanLyDatVeActions";

import checkOutCSS from "./Checkout.module.css";
import "./Checkout.css";
import { DAT_VE } from "../../redux/types/QuanLyDatVeType";
import _ from "lodash";

export default function Checkout(props) {
	const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
		(state) => state.QuanLyDatVeReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		const action = layChiTietPhongVeAction(props.match.params.id);
		dispatch(action);
	}, []);

	const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

	const renderSeats = () => {
		return danhSachGhe.map((ghe, index) => {
			let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
			let classGheDaDat = ghe.daDat ? "gheDaDat" : "";
			let classGheDangDat = "";

			let indexGheDangDat = danhSachGheDangDat.findIndex(
				(gheDD) => gheDD.maGhe === ghe.maGhe
			);
			if (indexGheDangDat !== -1) {
				classGheDangDat = "gheDangDat";
			}

			return (
				<Fragment key={index}>
					<button
						disabled={ghe.daDat}
						className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat}`}
						onClick={(e) => {
							dispatch({
								type: DAT_VE,
								gheDuocChon: ghe,
							});
						}}>
						{ghe.daDat ? "X" : ghe.stt}
					</button>

					{(index + 1) % 16 === 0 ? <br /> : ""}
				</Fragment>
			);
		});
	};

	return (
		<div className='mt-5' style={{ minHeight: "100vh" }}>
			<div className='grid grid-cols-12'>
				<div className='col-span-9'>
					<div className='flex justify-center flex-col items-center'>
						<div className='bg-black w-4/5 h-4'></div>
						<div className={`${checkOutCSS["trapezoid"]} text-center`}>
							<h3 className='mt-5 text-black'>Màn hình</h3>
						</div>
						<div>{renderSeats()}</div>
					</div>
				</div>
				<div className='col-span-3'>
					<div className='flex flex-col justify-between h-screen'>
						<div>
							<h3 className='text-center text-3xl text-green-500 font-bold '>
								{danhSachGheDangDat
									.reduce((tong, ghe, index) => {
										return (tong += ghe.giaVe);
									}, 0)
									.toLocaleString()}{" "}
								đ
							</h3>
							<hr />
							<h3 className='text-xl font-bold mt-3'>{thongTinPhim.tenPhim}</h3>
							<p>Địa điểm: {thongTinPhim.diaChi}</p>
							<p>
								{thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu} -{" "}
								{thongTinPhim.tenRap}
							</p>
							<hr />
							<div className='flex justify-between my-5'>
								<div>
									<span className='text-red-400'>Ghế: </span>
									{_.sortBy(danhSachGheDangDat, ["tenGhe"]).map(
										(ghe, index) => {
											return (
												<span
													key={index}
													className='text-green-700 text-lg font-bold'>
													{ghe.tenGhe + " "}
												</span>
											);
										}
									)}
								</div>
								<span className='text-green-600 text-xl font-bold'>
									{danhSachGheDangDat
										.reduce((tong, ghe, index) => {
											return (tong += ghe.giaVe);
										}, 0)
										.toLocaleString()}
									đ
								</span>
							</div>
							<hr />
							<div className='my-5'>
								<i>E-mail</i>
								<br />
								{userLogin.email}
							</div>
							<hr />
							<div className='my-5'>
								<i>Phone</i>
								<br />
								{userLogin.soDT}
							</div>
						</div>

						<div className='mb-0 flex justify-center'>
							<div className='bg-green-500 text-white w-full text-center py-3 font-bold text-lg cursor-pointer'>
								ĐẶT VÉ
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
