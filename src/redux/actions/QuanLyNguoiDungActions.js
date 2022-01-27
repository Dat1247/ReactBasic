import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
	DANG_NHAP_ACTION,
	GET_DANH_SACH_NGUOI_DUNG,
	GET_MA_LOAI_NGUOI_DUNG,
	GET_THONG_TIN_NGUOI_DUNG_EDIT,
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
		} catch (err) {
			console.log(err.response?.data);
			console.log(err);
		}
	};
};

export const dangKyAction = (thongTinDangKy) => {
	return async (dispatch) => {
		try {
			const result = await quanLyNguoiDungService.dangKyTaiKhoanNguoiDung(
				thongTinDangKy
			);

			alert("Đăng ký tài khoản thành công!");
			history.push("/login");
		} catch (err) {
			console.log(err.response?.data.content);
			alert(err.response?.data.content);
		}
	};
};

export const layDanhSachNguoiDungAction = (tuKhoa = "") => {
	return async (dispatch) => {
		try {
			const result = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);

			if (result.status === 200) {
				dispatch({
					type: GET_DANH_SACH_NGUOI_DUNG,
					danhSachNguoiDung: result.data.content,
				});
			}
		} catch (err) {
			console.log(err.response?.data);
			console.log(err);
		}
	};
};

export const xoaNguoiDungAction = (taiKhoan) => {
	return async (dispatch) => {
		try {
			const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);

			console.log(result);
			alert("Xóa người dùng thành công!");

			dispatch(layDanhSachNguoiDungAction());
		} catch (err) {
			console.log(err.response?.data);
		}
	};
};

export const layDanhSachMaLoaiNguoiDung = () => {
	return async (dispatch) => {
		try {
			const result = await quanLyNguoiDungService.layDanhSachMaLoaiNguoiDung();

			if (result.status === 200) {
				dispatch({
					type: GET_MA_LOAI_NGUOI_DUNG,
					listLoaiNguoiDung: result.data.content,
				});
			}
		} catch (err) {
			console.log(err.response?.data);
		}
	};
};

export const themNguoiDungAction = (nguoiDung) => {
	return async (dispatch) => {
		try {
			const result = await quanLyNguoiDungService.themNguoiDung(nguoiDung);

			alert("Thêm người dùng thành công!");
			history.goBack();
		} catch (err) {
			alert(err.response?.data.content);
			console.log(err.response?.data);
		}
	};
};

export const layThongTinNguoiDungEditAction = (tuKhoa) => {
	return async (dispatch) => {
		try {
			const result = await quanLyNguoiDungService.timKiemNguoiDung(tuKhoa);
			if (result.status === 200) {
				dispatch({
					type: GET_THONG_TIN_NGUOI_DUNG_EDIT,
					thongTinNguoiDungEdit: result.data.content[0],
				});
			}
		} catch (err) {
			console.log(err.response?.data);
		}
	};
};

export const capNhatNguoiDungAction = (nguoiDungCapNhat) => {
	return async (dispatch) => {
		try {
			const result = await quanLyNguoiDungService.chinhSuaNguoiDung(
				nguoiDungCapNhat
			);

			alert("Cập nhật thông tin thành công!");
			// history.goBack();
		} catch (err) {
			console.log(err.response?.data);
		}
	};
};
