import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
	constructor() {
		super();
	}

	layThongTinDangNhapNguoiDung = (thongTinDangNhap) => {
		return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
	};
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
