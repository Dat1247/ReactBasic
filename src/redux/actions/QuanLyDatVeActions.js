import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

import {
	DAT_VE_HOAN_TAT,
	SET_CHI_TIET_PHONG_VE,
	CHANGE_TAB,
} from "../types/QuanLyDatVeType";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
export const layChiTietPhongVeAction = (maLichChieu) => {
	return async (dispatch) => {
		try {
			const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);

			if (result.status === 200) {
				dispatch({
					type: SET_CHI_TIET_PHONG_VE,
					chiTietPhongVe: result.data.content,
				});
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
	return async (dispatch) => {
		try {
			dispatch(displayLoadingAction);

			const result = await quanLyDatVeService.datVe(thongTinDatVe);
			await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
			await dispatch({ type: DAT_VE_HOAN_TAT });

			await dispatch(hideLoadingAction);
			await dispatch({
				type: CHANGE_TAB,
			});
		} catch (err) {
			dispatch(hideLoadingAction);
			console.log(err);
		}
	};
};
