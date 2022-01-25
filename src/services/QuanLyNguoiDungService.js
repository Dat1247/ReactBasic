import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
	constructor() {
		super();
	}

	layDanhSachMaLoaiNguoiDung = () => {
		return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
	};

	layThongTinDangNhapNguoiDung = (thongTinDangNhap) => {
		return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
	};

	layThongTinNguoiDung = () => {
		return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
	};

	dangKyTaiKhoanNguoiDung = (thongTinDangKy) => {
		return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
	};

	layDanhSachNguoiDung = (tuKhoa = "") => {
		if (tuKhoa !== "") {
			return this.get(
				`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
			);
		}
		return this.get(
			`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
		);
	};
	timKiemNguoiDung = (tuKhoa) => {
		return this.get(
			`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
		);
	};
	xoaNguoiDung = (taiKhoan) => {
		return this.delete(
			`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
		);
	};
	themNguoiDung = (nguoiDung) => {
		return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nguoiDung);
	};

	chinhSuaNguoiDung = (nguoiDungUpdate) => {
		return this.post(
			`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
			nguoiDungUpdate
		);
	};

	//
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
