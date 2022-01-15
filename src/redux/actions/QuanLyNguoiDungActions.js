import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
	DANG_NHAP_ACTION,
	SET_THONG_TIN_NGUOI_DUNG,
} from "../types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
	return async (dispatch) => {
		try {
			const result = await quanLyNguoiDungService.layThongTinDangNhapNguoiDung(
				thongTinDangNhap
			);

			if (result.data.statusCode === 200) {
				dispatch({
					type: DANG_NHAP_ACTION,
					thongTinDangNhap: result.data.content,
				});
				history.goBack();
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const layThongTinNguoiDungAction = () => {
	return async (dispatch) => {
		try {
			const result = await quanLyNguoiDungService.layThongTinNguoiDung();
			if (result.status === 200) {
				dispatch({
					type: SET_THONG_TIN_NGUOI_DUNG,
					thongTinNguoiDung: result.data.content,
				});
			}
			console.log(result);
		} catch (err) {
			console.log(err.response?.data);
			console.log(err);
		}
	};
};
