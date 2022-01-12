import { quanLyRapService } from "../../services/QuanLyRapService";
import { SET_HE_THONG_RAP_CHIEU } from "../types/QuanLyRapType";

export const layDanhSachHeThongRapAction = () => {
	return async (dispatch) => {
		try {
			const result = await quanLyRapService.layDanhSachRap();

			dispatch({
				type: SET_HE_THONG_RAP_CHIEU,
				heThongRapChieu: result.data.content,
			});
		} catch (err) {
			console.log(err.response?.data);
		}
	};
};
