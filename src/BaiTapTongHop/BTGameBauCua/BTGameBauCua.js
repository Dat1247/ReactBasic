import React from "react";
import DanhSachCuoc from "./DanhSachCuoc";
import DanhSachXucXac from "./DanhSachXucXac";
import DiemCuoc from "./DiemCuoc";
import "./BTGameBauCua.css";

export default function BTGameBauCua(props) {
	return (
		<div id='BaiTapGameBauCua' className='container-fluid'>
			<DiemCuoc />
			<div className='row mt-5'>
				<div className='col-8'>
					<DanhSachCuoc />
				</div>
				<div className='col-4'>
					<DanhSachXucXac />
				</div>
			</div>
		</div>
	);
}
