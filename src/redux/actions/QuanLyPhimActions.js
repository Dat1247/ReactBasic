import { history } from "../../App";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import {
	SET_DANH_SACH_PHIM,
	SET_THONG_TIN_PHIM,
} from "../types/QuanLyPhimTypes";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";

export const layDanhSachPhimAction = () => {
	return async (dispatch) => {
		try {
			//Sử dụng tham số thamSo
			const result = await quanLyPhimService.layDanhSachPhim();

			dispatch({
				type: SET_DANH_SACH_PHIM,
				arrFilm: result.data.content,
			});
		} catch (errors) {
			console.log("errors", errors);
		}
	};
};

export const themPhimUpLoadHinhAction = (formData) => {
	return async (dispatch) => {
		try {
			dispatch(displayLoadingAction);

			const result = await quanLyPhimService.themPhimUpLoadHinh(formData);
			dispatch(layDanhSachPhimAction());

			history.push("/admin/films");
			console.log(result);
		} catch (errors) {
			dispatch(hideLoadingAction);

			console.log(errors.response?.data);
			console.log(errors);
		}
		dispatch(hideLoadingAction);
	};
};

export const layThongTinPhimAction = (maPhim) => {
	return async (dispatch) => {
		try {
			const result = await quanLyPhimService.layThongTinPhim(maPhim);
			console.log(result);

			dispatch({
				type: SET_THONG_TIN_PHIM,
				thongTinPhim: result.data.content,
			});
		} catch (errors) {
			console.log(errors.response?.data);
			console.log(errors);
		}
	};
};

export const capNhatPhimUploadAction = (formData) => {
	return async (dispatch) => {
		try {
			const result = await quanLyPhimService.capNhatPhimUpload(formData);
			alert("Cập nhật phim thành công");
			console.log(result);

			dispatch(layDanhSachPhimAction());
			history.push("/admin/films");
		} catch (errors) {
			console.log(errors.response?.data);
			console.log(errors);
		}
	};
};
