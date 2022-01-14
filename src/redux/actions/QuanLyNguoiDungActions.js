import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION } from "../types/QuanLyNguoiDungType";

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
