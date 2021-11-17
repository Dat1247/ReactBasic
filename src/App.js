import React, { Component } from "react";
import DemoProps from "./Props/DemoProps";
import ProductList from "./Props/ProductList";
import dataJson from "./Data/data.json";
import DanhSachSanPham from "./Props/DanhSachSanPham";
import ExerciseCarStore from "./Props/ExerciseCarStore/ExerciseCarStore";
import ExerciseCart from "./Props/ExerciseCart/ExerciseCart";
import BTGioHangRedux from "./GioHangRedux/BTGioHangRedux";
import BTGameXucXac from "./BaiTapRedux/BTGameXucXac";
import BTOanTuTi from "./BaiTapRedux/BTOanTuTi/BTOanTuTi";

export default class App extends Component {
	render() {
		return (
			// <div className='container-fluid'>
			// 	{/* <DemoProps /> */}
			// 	<div className='row'>
			// 		<div className='col-4'>
			// 			<div
			// 				className='nav flex-column nav-pills  justify-content-center'
			// 				style={{ minHeight: 710 }}
			// 				id='v-pills-tab'
			// 				role='tablist'>
			// 				<a
			// 					className='nav-link active'
			// 					id='v-pills-home-tab'
			// 					data-toggle='pill'
			// 					href='#home'
			// 					role='tab'>
			// 					Home
			// 				</a>
			// 				<a
			// 					className='nav-link'
			// 					id='v-pills-profile-tab'
			// 					data-toggle='pill'
			// 					href='#shop'
			// 					role='tab'>
			// 					Shop
			// 				</a>
			// 			</div>
			// 		</div>
			// 		<div className='col-8'>
			// 			<div className='tab-content' id='v-pills-tabContent'>
			// 				<div
			// 					className='tab-pane fade show active'
			// 					id='home'
			// 					role='tabpanel'>
			// 					<ProductList arrProduct={dataJson} />
			// 				</div>
			// 				<div className='tab-pane fade' id='shop' role='tabpanel'>
			// 					Shop
			// 				</div>
			// 			</div>
			// 		</div>
			// 	</div>
			// </div>
			<div>
				{/* <DanhSachSanPham /> */}
				{/* <ExerciseCarStore /> */}
				{/* <ExerciseCart /> */}
				{/* <BTGioHangRedux /> */}
				{/* <BTGameXucXac /> */}
				<BTOanTuTi />
			</div>
		);
	}
}
