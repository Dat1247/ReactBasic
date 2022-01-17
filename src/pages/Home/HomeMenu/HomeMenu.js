import React, { Fragment } from "react";
import { Tabs, Radio, Space } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
	const { heThongRapChieu } = props;

	const renderHeThongRap = () => {
		return heThongRapChieu?.map((heThongRap, index) => {
			return (
				<TabPane
					tab={
						<img
							src={heThongRap.logo}
							className='rounded-full w-12'
							alt={heThongRap.logo}
						/>
					}
					key={index}>
					<Tabs tabPosition='left'>
						{heThongRap.lstCumRap?.map((cumRap, index) => {
							return (
								<TabPane
									tab={
										<div style={{ width: "300px" }} className='flex'>
											<img
												src={cumRap.hinhAnh}
												className=' w-12'
												alt={cumRap.hinhAnh}
											/>
											<div className='ml-2 text-left'>
												{cumRap.tenCumRap}
												<p className='text-red-400'>Chi tiết</p>
											</div>
										</div>
									}
									key={index}>
									{/**Load phim */}
									{cumRap.danhSachPhim.map((phim, index) => {
										return (
											<Fragment key={index}>
												<div className='my-5'>
													<div className='flex'>
														<img
															style={{ width: "100px", height: "125px" }}
															src={phim.hinhAnh}
															alt={phim.tenPhim}
															onError={(e) => {
																e.target.onerror = null;
																e.target.src = "https://picsum.photos/75/75";
															}}
														/>
														<div className='ml-4'>
															<h1 className='text-xl text-green-700 font-bold'>
																{phim.tenPhim}
															</h1>
															<p>{cumRap.diaChi}</p>
															<div className='grid grid-cols-7 gap-4'>
																{phim.lstLichChieuTheoPhim
																	?.slice(0, 12)
																	.map((lichChieu, index) => {
																		return (
																			<NavLink
																				to={`/checkout/${lichChieu.maLichChieu}`}
																				key={index}
																				className='text-base border-green-400 border-2 bg-green-400 text-white p-2 hover:bg-white hover:text-green-400 '>
																				{moment(
																					lichChieu.ngayChieuGioChieu
																				).format("hh:mm A")}
																			</NavLink>
																		);
																	})}
															</div>
														</div>
													</div>
												</div>
												<hr />
											</Fragment>
										);
									})}
								</TabPane>
							);
						})}
					</Tabs>
				</TabPane>
			);
		});
	};

	return (
		<>
			<Tabs tabPosition='left'>{renderHeThongRap()}</Tabs>
		</>
	);
}
