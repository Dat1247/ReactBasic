import {
	SET_DANH_SACH_PHIM,
	SET_PHIM_DANG_CHIEU,
	SET_PHIM_SAP_CHIEU,
	SET_THONG_TIN_PHIM,
} from "../types/QuanLyPhimTypes";
import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapType";

const initialState = {
	arrFilm: [
		{
			maPhim: 9586,
			tenPhim: "Iron Man (2008)",
			biDanh: "iron-man-2008-",
			trailer: "https://www.youtube.com/embed/8ugaeA-nMTc",
			hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/iron-man-2008-_gp00.jpg",
			moTa: 'Bruce Banner là nhà khoa học tham gia vào chương trình siêu chiến binh do đại tướng Thaddeus "Thunderbolt" Ross khởi xướng. Chương trình thất bại, Bruce Banner bị nhiễm phóng xạ và biến thành người khổng lồ xanh mỗi khi giận dữ. Bruce Banner vừa phải vật lộn khống chế bản thân, vừa trở thành mục tiêu truy đuổi của chính quyền, các thế lực xấu muốn sức mạnh.',
			maNhom: "GP00",
			ngayKhoiChieu: "2022-01-02T00:00:00",
			danhGia: 9,
			hot: true,
			dangChieu: false,
			sapChieu: true,
		},
	],
	dangChieu: false,
	sapChieu: false,
	arrFilmDefault: [],
	filmDetail: {},

	thongTinPhim: {},
};

export const QuanLyPhimReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DANH_SACH_PHIM: {
			state.arrFilm = action.arrFilm;
			state.arrFilmDefault = state.arrFilm;
			return { ...state };
		}
		case SET_PHIM_DANG_CHIEU: {
			state.dangChieu = true;
			state.sapChieu = false;
			state.arrFilm = state.arrFilmDefault.filter(
				(film) => film.dangChieu === state.dangChieu
			);
			return { ...state };
		}
		case SET_PHIM_SAP_CHIEU: {
			state.sapChieu = true;
			state.dangChieu = false;

			state.arrFilm = state.arrFilmDefault.filter(
				(film) => film.sapChieu === state.sapChieu
			);

			return { ...state };
		}
		case SET_CHI_TIET_PHIM: {
			state.filmDetail = action.filmDetail;
			return { ...state };
		}
		case SET_THONG_TIN_PHIM: {
			state.thongTinPhim = action.thongTinPhim;
			return { ...state };
		}
		default:
			return { ...state };
	}
};
