import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
	constructor() {
		super();
	}

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
	xoaNguoiDung = (taiKhoan) => {
		return this.delete(
			`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
		);
	};
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
