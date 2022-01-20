import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
	constructor() {
		super();
	}

	layThongTinHeThongRap = () => {
		return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
	};

	layDanhSachRap = () => {
		return this.get(
			`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
		);
	};

	layThongTinLichChieuPhim = (maPhim) => {
		return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
	};

	layThongTinCumRap = (maHTR) => {
		return this.get(
			`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHTR}`
		);
	};
}

export const quanLyRapService = new QuanLyRapService();
