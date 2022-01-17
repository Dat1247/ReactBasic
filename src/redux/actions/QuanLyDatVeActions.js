import { connection } from "../..";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

import {
	DAT_VE_HOAN_TAT,
	SET_CHI_TIET_PHONG_VE,
	CHANGE_TAB,
	DAT_VE,
} from "../types/QuanLyDatVeType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
export const layChiTietPhongVeAction = (maLichChieu) => {
	return async (dispatch) => {
		try {
			dispatch(displayLoadingAction);
			const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

			if (result.status === 200) {
				dispatch({
					type: SET_CHI_TIET_PHONG_VE,
					chiTietPhongVe: result.data.content,
				});
			}
		} catch (err) {
			dispatch(hideLoadingAction);

			console.log(err);
		}
		dispatch(hideLoadingAction);
	};
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
	return async (dispatch, getState) => {
		try {
			dispatch(displayLoadingAction);

			const result = await quanLyDatVeService.datVe(thongTinDatVe);
			await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
			await dispatch({ type: DAT_VE_HOAN_TAT });

			await dispatch(hideLoadingAction);

			let userLogin = getState().QuanLyNguoiDungReducer.userLogin;

			connection.invoke(
				"datGheThanhCong",
				userLogin.taiKhoan,
				thongTinDatVe.maLichChieu
			);

			await dispatch({
				type: CHANGE_TAB,
			});
		} catch (err) {
			dispatch(hideLoadingAction);
			console.log(err);
		}
	};
};

export const datGheAction = (ghe, maLichChieu) => {
	return async (dispatch, getState) => {
		//Đưa thông tin ghế lên reducer
		await dispatch({
			type: DAT_VE,
			gheDuocChon: ghe,
		});
		//Call api về backend để lấy tài khoản và danh sách ghé đang đặt
		let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
		let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

		danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);

		// console.log("danhSachGheDangDat", danhSachGheDangDat);
		// console.log("taiKhoan", taiKhoan);
		// console.log("maLichChieu", maLichChieu);

		//Call api signalR
		connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
	};
};
