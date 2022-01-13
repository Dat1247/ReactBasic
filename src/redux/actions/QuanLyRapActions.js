import { quanLyRapService } from "../../services/QuanLyRapService";
import {
	SET_CHI_TIET_PHIM,
	SET_HE_THONG_RAP_CHIEU,
} from "../types/QuanLyRapType";

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

export const layThongTinChiTietPhimAction = (id) => {
	return async (dispatch) => {
		try {
			const result = await quanLyRapService.layThongTinLichChieuPhim(id);

			//Lay duoc du lieu tu api va dua len reducer
			dispatch({
				type: SET_CHI_TIET_PHIM,
				filmDetail: result.data.content,
			});
		} catch (err) {
			console.log(err.response?.data);
		}
	};
};
