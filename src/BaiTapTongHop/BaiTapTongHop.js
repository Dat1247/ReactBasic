import _ from "lodash";
import React, { useState } from "react";
import Popup from "./Popup";

const data = [
	{
		maMonAn: "MA01",
		tenMonAn: "Cơm chiên dương châu",
		gia: 200,
		hinhAnh: "http://casestudy.cyberlearn.vn/img/MA01.jpeg",
		maDanhMuc: "MC",
		tenDanhMuc: "Món chiên",
	},
	{
		maMonAn: "MA02",
		tenMonAn: "Cơm chiên cá mặn",
		gia: 300,
		hinhAnh: "http://casestudy.cyberlearn.vn/img/MA02.jpeg",
		maDanhMuc: "MC",
		tenDanhMuc: "Món chiên",
	},
	{
		maMonAn: "MA03",
		tenMonAn: "Gà nướng muối ớt",
		gia: 500,
		hinhAnh: "http://casestudy.cyberlearn.vn/img/MA03.jpeg",
		maDanhMuc: "MN",
		tenDanhMuc: "Món nướng",
	},
	{
		maMonAn: "MA04",
		tenMonAn: "Gà nướng muối tiêu chanh",
		gia: 600,
		hinhAnh: "http://casestudy.cyberlearn.vn/img/MA04.jpeg",
		maDanhMuc: "MN",
		tenDanhMuc: "Món nướng",
	},
	{
		maMonAn: "MA05",
		tenMonAn: "Trà đào cam sả",
		gia: 50,
		hinhAnh: "http://casestudy.cyberlearn.vn/img/MA05.jpeg",
		maDanhMuc: "GK",
		tenDanhMuc: "Giải khát",
	},
	{
		maMonAn: "MA06",
		tenMonAn: "Bia heniken",
		gia: 50,
		hinhAnh: "http://casestudy.cyberlearn.vn/img/MA06.jpeg",
		maDanhMuc: "GK",
		tenDanhMuc: "Giải khát",
	},
];

export default function BaiTapTongHop() {
	const mangDanhMuc = _.uniqBy(data, "maDanhMuc");

	const [maDanhMuc, setMaDanhMuc] = useState(mangDanhMuc[0].maDanhMuc);
	const [openModal, setOpenModal] = useState(false);
	const [item, setItem] = useState({});

	const renderMangDanhMuc = () => {
		return mangDanhMuc.map((dm, index) => {
			const classNameActive = [
				"flex",
				"items-center",
				"p-2",
				"space-x-3",
				"rounded-md",
				maDanhMuc === dm.maDanhMuc ? "bg-black text-white" : "",
			];

			return (
				<li
					className='dark:bg-coolGray-800 dark:text-coolGray-50'
					key={index}
					onClick={() => {
						setMaDanhMuc(dm.maDanhMuc);
					}}>
					<a href='#' className={_.join(classNameActive, " ")}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'
							className='w-5 h-5 fillCurrent dark:text-coolGray-400'>
							<path d='M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z'></path>
						</svg>
						<span>{dm.tenDanhMuc}</span>
					</a>
				</li>
			);
		});
	};

	return (
		<div>
			<Popup openModal={openModal} setOpenModal={setOpenModal} item={item} />

			<div className='grid grid-cols-6'>
				<div className=' h-full p-3 space-y-2  dark:bg-coolGray-900 dark:text-coolGray-100'>
					<div className='flex items-center p-2 space-x-4'>
						<img
							src='https://source.unsplash.com/100x100/?portrait'
							alt=''
							className='w-12 h-12 rounded-full dark:bg-coolGray-500'
						/>
						<div>
							<h2 className='text-lg font-semibold'>Leroy Jenkins</h2>
							<span className='flex items-center space-x-1'>
								<a
									href='#'
									className='text-xs hover:underline dark:text-coolGray-400'>
									View profile
								</a>
							</span>
						</div>
					</div>
					<div className='divide-y divide-coolGray-700'>
						<h3>Danh mục sản phẩm</h3>
						<ul className='pt-2 pb-4 space-y-1 text-sm'>
							{renderMangDanhMuc()}
						</ul>
						<ul className='pt-4 pb-2 space-y-1 text-sm'>
							<li>
								<a
									href='#'
									className='flex items-center p-2 space-x-3 rounded-md'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'
										className='w-5 h-5 fillCurrent dark:text-coolGray-400'>
										<path d='M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z'></path>
										<path d='M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z'></path>
									</svg>
									<span>Settings</span>
								</a>
							</li>
							<li>
								<a
									href='#'
									className='flex items-center p-2 space-x-3 rounded-md'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'
										className='w-5 h-5 fillCurrent dark:text-coolGray-400'>
										<path d='M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z'></path>
										<rect width='32' height='64' x='256' y='232'></rect>
									</svg>
									<span>Logout</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className='col-span-5'>
					<h3 className='text-center text-purple-600 text-6xl mt-10'>Menu</h3>

					<section className='text-gray-600 body-font '>
						<div className='container px-5 py-10 mx-auto'>
							<div className='flex flex-wrap -m-4'>
								{_.filter(data, (item) => item.maDanhMuc === maDanhMuc).map(
									(item, index) => {
										return (
											<div className='p-4 md:w-1/3 ' key={index}>
												<div className='h-full border-2 border-gray-300 border-opacity-60 rounded-lg shadow overflow-hidden'>
													<div className='p-6'>
														<h2 className='inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest'>
															{item.tenDanhMuc}
														</h2>
														<h1 className='sm:text-2xl text-xl title-font font-medium text-gray-900 mt-4 mb-4'>
															{item.tenMonAn}
														</h1>
														<div className='leading-relaxed mb-3'>
															<img
																className='lg:h-48 md:h-36 w-full object-cover object-center'
																src={item.hinhAnh}
																alt={item.tenMonAn}
															/>
														</div>
														<div className='flex items-center flex-wrap '>
															<a
																className='text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0'
																onClick={() => {
																	setOpenModal(true);
																	setItem(item);
																}}>
																Chi tiết
																<svg
																	className='w-4 h-4 ml-2'
																	viewBox='0 0 24 24'
																	stroke='currentColor'
																	strokeWidth={2}
																	fill='none'
																	strokeLinecap='round'
																	strokeLinejoin='round'>
																	<path d='M5 12h14' />
																	<path d='M12 5l7 7-7 7' />
																</svg>
															</a>
															<span className='text-black mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-gray-200 font-bold'>
																Giá tiền: {item.gia}
															</span>
														</div>
													</div>
												</div>
											</div>
										);
									}
								)}
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}