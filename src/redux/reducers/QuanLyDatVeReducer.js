import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import {
	CHANGE_TAB,
	CHUYEN_TAB_ACTIVE,
	DAT_VE,
	DAT_VE_HOAN_TAT,
	SET_CHI_TIET_PHONG_VE,
} from "../types/QuanLyDatVeType";

const initialState = {
	chiTietPhongVe: new ThongTinLichChieu(),
	danhSachGheDangDat: [],
	tabActive: "1",
};

export const QuanLyDatVeReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CHI_TIET_PHONG_VE: {
			state.chiTietPhongVe = action.chiTietPhongVe;
			return { ...state };
		}
		case DAT_VE: {
			//Cập nhật danh sách ghế đang đặt
			let danhSachGheCapNhat = [...state.danhSachGheDangDat];
			let index = danhSachGheCapNhat.findIndex(
				(gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe
			);
			if (index !== -1) {
				danhSachGheCapNhat.splice(index, 1);
			} else {
				danhSachGheCapNhat.push(action.gheDuocChon);
			}
			state.danhSachGheDangDat = danhSachGheCapNhat;
			return { ...state };
		}
		case DAT_VE_HOAN_TAT: {
			state.danhSachGheDangDat = [];
			return { ...state };
		}
		case CHANGE_TAB: {
			state.tabActive = "2";
			return { ...state };
		}
		case CHUYEN_TAB_ACTIVE: {
			state.tabActive = action.tabActive;
			return { ...state };
		}
		default:
			return { ...state };
	}
};
