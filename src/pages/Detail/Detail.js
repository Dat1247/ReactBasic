import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Rate } from "antd";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/circle.css";
import moment from "moment";
import { layThongTinChiTietPhimAction } from "../../redux/actions/QuanLyRapActions";

const { TabPane } = Tabs;

export default function Detail(props) {
	const { filmDetail } = useSelector((state) => state.QuanLyPhimReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		let { id } = props.match.params;
		dispatch(layThongTinChiTietPhimAction(id));
	}, []);

	console.log("filmDetail", filmDetail);
	return (
		<div
			style={{
				backgroundImage: `url(${filmDetail.hinhAnh})`,
				backgroundSize: "100%",
				backgroundPosition: "center",
				minHeight: "100vh",
			}}>
			<CustomCard
				style={{ paddingTop: "150px", minHeight: "100vh" }}
				effectColor='#000' // required
				color='#000' // default color is white
				blur={10} // default blur value is 10px
				borderRadius={0} // default border radius value is 10px
			>
				<div className='grid grid-cols-12'>
					<div className='col-span-5 col-start-3'>
						<div className='grid grid-cols-3'>
							<img
								className='col-span-1'
								src={filmDetail.hinhAnh}
								alt={filmDetail.hinhAnh}
								style={{ width: "100%", height: 300 }}
							/>
							<div
								className='col-span-2 text-white ml-4'
								style={{ marginTop: "25%" }}>
								<p className='mb-0'>
									{moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
								</p>
								<h1 className='text-2xl text-white mb-0'>
									{filmDetail.tenPhim}
								</h1>
								<p>
									{/* {filmDetail.moTa.length > 50
										? filmDetail.moTa.splice(0, 50) + "..."
										: filmDetail.moTa} */}
									{filmDetail.moTa}
								</p>
							</div>
						</div>
					</div>
					<div className='col-span-4 flex flex-col items-center'>
						<h1
							style={{
								color: "yellow",
								fontSize: 15,
								fontWeight: "bold",
							}}>
							Đánh giá
						</h1>
						<h1 className='text-green-400 text-2xl'>
							<Rate
								allowHalf
								value={filmDetail.danhGia / 2}
								style={{ color: "#78ed78", fontSize: 30 }}
							/>
						</h1>
						<div
							className={`c100 p${filmDetail.danhGia * 10} big`}
							style={{ left: "4%" }}>
							<span>{filmDetail.danhGia}</span>
							<div className='slice'>
								<div className='bar'></div>
								<div className='fill'></div>
							</div>
						</div>
					</div>
				</div>
				<Tabs defaultActiveKey='1' centered>
					<TabPane tab='Lịch chiếu' key='1'>
						<div className='mt-20 container ml-72 w-2/3 bg-white p-5'>
							<Tabs tabPosition='left'>
								{filmDetail.heThongRapChieu?.map((heThongRap, index) => {
									return (
										<TabPane
											tab={
												<div className='flex items-center justify-center'>
													<img
														src={heThongRap.logo}
														alt={heThongRap.logo}
														width={50}
														className='rounded-full'
													/>
													<div className='text-center ml-2'>
														{heThongRap.tenHeThongRap}
													</div>
												</div>
											}
											key={index}>
											{heThongRap.cumRapChieu?.map((cumRapChieu, index) => {
												return (
													<div key={index} className='mt-4'>
														<div className='flex'>
															<img
																src={cumRapChieu.hinhAnh}
																alt={cumRapChieu.hinhAnh}
																style={{ width: 50, height: 50 }}
															/>
															<div className='ml-2'>
																{cumRapChieu.tenCumRap}
																<p className='text-gray-400 mb-0'>
																	{cumRapChieu.diaChi}
																</p>
															</div>
														</div>
														<div className='grid grid-cols-4 mt-4'>
															{cumRapChieu.lichChieuPhim
																?.slice(0, 12)
																.map((lichChieu, index) => {
																	return (
																		<NavLink
																			to={`/checkout/${lichChieu.maLichChieu}`}
																			key={index}
																			className='col-span-1 text-green-500 font-bold'>
																			{moment(
																				lichChieu.ngayChieuGioChieu
																			).format("hh:mm A")}
																		</NavLink>
																	);
																})}
														</div>
													</div>
												);
											})}
										</TabPane>
									);
								})}
							</Tabs>
						</div>
					</TabPane>
					<TabPane tab='Thông tin' key='2'>
						Thông tin
					</TabPane>
					<TabPane tab='Đánh giá' key='3'>
						Đánh giá
					</TabPane>
				</Tabs>
			</CustomCard>
		</div>
	);
}
