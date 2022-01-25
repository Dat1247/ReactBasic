import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
	DANG_NHAP_ACTION,
	GET_DANH_SACH_NGUOI_DUNG,
	GET_MA_LOAI_NGUOI_DUNG,
	SET_THONG_TIN_NGUOI_DUNG,
	GET_THONG_TIN_NGUOI_DUNG_EDIT,
} from "../types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
	user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
	userLogin: user,
	thongTinNguoiDung: {},
	listLoaiNguoiDung: [],
	danhSachNguoiDung: [],
	danhSachNguoiDungDefault: [],
	thongTinNguoiDungEdit: {},
};

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
	switch (action.type) {
		case DANG_NHAP_ACTION: {
			const { thongTinDangNhap } = action;

			localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
			localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
			state.userLogin = thongTinDangNhap;
			return { ...state };
		}
		case SET_THONG_TIN_NGUOI_DUNG: {
			state.thongTinNguoiDung = action.thongTinNguoiDung;
			return { ...state };
		}
		case GET_DANH_SACH_NGUOI_DUNG: {
			state.danhSachNguoiDung = action.danhSachNguoiDung;
			state.danhSachNguoiDungDefault = state.danhSachNguoiDung;
			return { ...state };
		}
		case GET_MA_LOAI_NGUOI_DUNG: {
			state.listLoaiNguoiDung = action.listLoaiNguoiDung;
			return { ...state };
		}
		case GET_THONG_TIN_NGUOI_DUNG_EDIT: {
			state.thongTinNguoiDungEdit = action.thongTinNguoiDungEdit;
			return { ...state };
		}
		default:
			return { ...state };
	}
};
