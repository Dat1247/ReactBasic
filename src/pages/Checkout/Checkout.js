import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	datGheAction,
	datVeAction,
	layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeActions";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungActions";
import { CloseOutlined, UserOutlined, SmileOutlined } from "@ant-design/icons";

import checkOutCSS from "./Checkout.module.css";
import "./Checkout.css";
import { CHUYEN_TAB_ACTIVE, DAT_GHE } from "../../redux/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Tabs } from "antd";
import moment from "moment";
import { connection } from "../../index";
import { history } from "../../App";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

function Checkout(props) {
	const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
		useSelector((state) => state.QuanLyDatVeReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		const action = layChiTietPhongVeAction(props.match.params.id);
		dispatch(action);

		//Có 1 client thực hiện việc đặt vé thành công => load lại danh sách phòng vé của lịch chiếu đó
		connection.on("datVeThanhCong", () => {
			dispatch(action);
		});

		//Vừa vào trang sẽ load tất cả ghế của người khác đang đặt
		connection.invoke("loadDanhSachGhe", props.match.params.id);

		//Load danh sách ghế đang đặt từ server về
		connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
			//Bước 1: Loại mình ra khỏi danh sách
			dsGheKhachDat = dsGheKhachDat.filter(
				(item) => item.taiKhoan !== userLogin.taiKhoan
			);

			//Bước 2: Gộp danh sách ghế khách đặt ở tất cả user thành 1 mảng chung
			let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
				let arrGhe = JSON.parse(item.danhSachGhe);
				return [...result, ...arrGhe];
			}, []);

			arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

			//Đưa dữ liệu khách đặt lên redux
			dispatch({
				type: DAT_GHE,
				danhSachGheKhachDat: arrGheKhachDat,
			});
		});

		//Cài đặt sự kiện khi reload trang
		window.addEventListener("beforeunload", clearGhe);

		return () => {
			clearGhe();
			window.removeEventListener("beforeunload", clearGhe);
		};
	}, []);

	const clearGhe = (event) => {
		connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
	};

	const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

	const renderSeats = () => {
		return danhSachGhe.map((ghe, index) => {
			let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
			let classGheDaDat = ghe.daDat ? "gheDaDat" : "";
			let classGheDangDat = "";
			let classDaDuocDat = "";

			let indexGheDangDat = danhSachGheDangDat.findIndex(
				(gheDD) => gheDD.maGhe === ghe.maGhe
			);
			if (indexGheDangDat !== -1) {
				classGheDangDat = "gheDangDat";
			}
			if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
				classDaDuocDat = "gheDaDuocDat";
			}

			//Kiểm tra từng ghế có phải là ghế khách đặt hay không
			let classGheKhachDat = "";
			let indexGheKhachDat = danhSachGheKhachDat.findIndex(
				(gheKD) => gheKD.maGhe === ghe.maGhe
			);
			if (indexGheKhachDat !== -1) {
				classGheKhachDat = "gheKhachDat";
			}

			return (
				<Fragment key={index}>
					<button
						disabled={ghe.daDat || classGheKhachDat !== ""}
						className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classDaDuocDat} ${classGheKhachDat}`}
						onClick={(e) => {
							const action = datGheAction(ghe, props.match.params.id);
							dispatch(action);
						}}>
						{ghe.daDat ? (
							classDaDuocDat != "" ? (
								<UserOutlined
									style={{ fontWeight: "bold", marginBottom: 7.5 }}
								/>
							) : (
								<CloseOutlined
									style={{ fontWeight: "bold", marginBottom: 7.5 }}
								/>
							)
						) : classGheKhachDat != "" ? (
							<SmileOutlined
								style={{ fontWeight: "bold", marginBottom: 7.5 }}
							/>
						) : (
							ghe.stt
						)}
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
					<div className='mt-5'>
						<table className='w-full divide-y divide-gray-500'>
							<thead className='bg-gray-50'>
								<tr>
									<th>Ghế chưa đặt</th>
									<th>Ghế đang đặt</th>
									<th>Ghế vip</th>
									<th>Ghế đã được đặt</th>
									<th>Ghế mình đặt</th>
									<th>Ghế khách đang đặt</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								<tr>
									<td className='text-center'>
										<button className='ghe text-center'>00</button>
									</td>
									<td className='text-center'>
										<button className='ghe gheDangDat text-center'>00</button>
									</td>
									<td className='text-center'>
										<button className='ghe gheVip text-center'>00</button>
									</td>
									<td className='text-center'>
										<button className='ghe gheDaDat text-center'>
											<CloseOutlined
												style={{ fontWeight: "bold", marginBottom: 7.5 }}
											/>
										</button>
									</td>
									<td className='text-center'>
										<button className='ghe gheDaDuocDat text-center'>
											<UserOutlined
												style={{ fontWeight: "bold", marginBottom: 7.5 }}
											/>
										</button>
									</td>
									<td className='text-center'>
										<button className='ghe gheKhachDat text-center'>
											<UserOutlined
												style={{ fontWeight: "bold", marginBottom: 7.5 }}
											/>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
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
							<div
								onClick={() => {
									const thongTinDatVe = new ThongTinDatVe();
									thongTinDatVe.maLichChieu = props.match.params.id;
									thongTinDatVe.danhSachVe = danhSachGheDangDat;

									const action = datVeAction(thongTinDatVe);
									dispatch(action);
								}}
								className='bg-green-500 text-white w-full text-center py-3 font-bold text-lg cursor-pointer'>
								ĐẶT VÉ
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Demo(props) {
	const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
	const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch({
				type: CHUYEN_TAB_ACTIVE,
				tabActive: "1",
			});
		};
	}, []);

	const operations = (
		<Fragment>
			{!_.isEmpty(userLogin) ? (
				<div className='flex items-center'>
					<button
						onClick={() => {
							history.push("/profile");
						}}
						className='flex items-center mr-3'>
						<div
							className='rounded-full bg-red-300 font-bold text-white flex justify-center items-center text-lg mr-3'
							style={{ width: 50, height: 50 }}>
							{userLogin.taiKhoan.substr(0, 1).toUpperCase()}
						</div>
						<b>Hello ! </b> {userLogin.taiKhoan}
					</button>
					<button
						onClick={() => {
							localStorage.removeItem(USER_LOGIN);
							localStorage.removeItem(TOKEN);
							history.push("/");
							window.location.reload();
						}}
						className='text-red-800'>
						Sign out
					</button>
				</div>
			) : (
				""
			)}
		</Fragment>
	);

	return (
		<div className='p-5'>
			<Tabs
				tabBarExtraContent={operations}
				defaultActiveKey='1'
				activeKey={tabActive}
				onChange={(key) => {
					dispatch({
						type: CHUYEN_TAB_ACTIVE,
						tabActive: key,
					});
				}}>
				<TabPane tab='01 CHỌN GHẾ &amp; THANH TOÁN' key='1'>
					<Checkout {...props} />
				</TabPane>
				<TabPane tab='02 KẾT QUẢ ĐẶT VÉ' key='2'>
					<KetQuaDatVe {...props} />
				</TabPane>
				<TabPane tab={<NavLink to='/'>HOME</NavLink>} key='3'></TabPane>
			</Tabs>
		</div>
	);
}

function KetQuaDatVe(props) {
	const { thongTinNguoiDung } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		const action = layThongTinNguoiDungAction();
		dispatch(action);
	}, []);

	const renderTicketItem = () => {
		return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
			const seats = _.first(ticket.danhSachGhe);
			return (
				<div className='p-2 lg:w-1/3 md:w-1/2 w-full' key={index}>
					<div className='h-full flex items-center border-gray-200 border p-4 rounded-lg'>
						<img
							alt='team'
							className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
							src={ticket.hinhAnh}
						/>
						<div className='flex-grow'>
							<h2 className='text-gray-900 title-font font-medium'>
								{ticket.tenPhim}
							</h2>
							<p className='text-gray-500'>
								Thời gian chiếu:
								{moment(ticket.ngayDat).format(" hh:mm A - DD-MM-YYYY")}
							</p>
							<p>
								Địa điểm: {seats.tenHeThongRap} - {seats.tenCumRap}
							</p>
							<p>
								Ghế:{" "}
								{ticket.danhSachGhe?.map((ghe, index) => {
									return (
										<span key={index} className='text-green-800 pr-1 font-bold'>
											{ghe.tenGhe}
										</span>
									);
								})}
							</p>
						</div>
					</div>
				</div>
			);
		});
	};
	return (
		<section className='text-gray-600 body-font'>
			<div className='container px-5 py-24 mx-auto'>
				<div className='flex flex-col text-center w-full mb-20'>
					<h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-900 text-2xl'>
						LỊCH SỬ KHÁCH HÀNG ĐẶT VÉ
					</h1>
					<p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
						Hãy kiểm tra chính xác thông tin, thời gian và địa điểm vé
					</p>
				</div>
				<div className='flex flex-wrap -m-2'>{renderTicketItem()}</div>
			</div>
		</section>
	);
}
