import React from "react";
import "./Film_Flip.css";
import { PlayCircleOutlined } from "@ant-design/icons";

import { history } from "../../App";

export default function Film_Flip(props) {
	const { film } = props;
	return (
		<div className='flip-card my-4'>
			<div className='flip-card-inner'>
				<div className='flip-card-front'>
					{/* <div
						style={{
							backgroundImage: `url(${film.hinhAnh})`,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}}> */}
					<img
						src={film.hinhAnh}
						alt='Avatar'
						style={{ width: "100%", height: 300 }}
						// className='opacity-0'
					/>
					{/* </div> */}
				</div>
				<div
					className='flip-card-back'
					style={{ position: "relative", backgroundColor: "rgba(0,0,0,0.5)" }}>
					<div style={{ position: "absolute", top: 0, left: 0 }}>
						<img
							src={film.hinhAnh}
							alt='Avatar'
							style={{ width: "100%", height: 300 }}
						/>
					</div>
					<div
						className='w-full h-full flex justify-center items-center'
						style={{
							position: "absolute",
							backgroundColor: "rgba(0,0,0,0.3)",
						}}>
						<div className='p-4'>
							<div className='rounded-full cursor-pointer'>
								<PlayCircleOutlined style={{ fontSize: "50px" }} />
							</div>
							<h1 className='title-font sm:text-2xl text-xl font-medium text-white mt-3 h-16'>
								{film.tenPhim}
							</h1>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={() => {
					history.push(`/detail/${film.maPhim}`);
				}}
				className='bg-indigo-300 text-center py-2 my-2 text-success-50 font-bold cursor-pointer w-full'>
				ĐẶT VÉ
			</div>
		</div>
	);
}
