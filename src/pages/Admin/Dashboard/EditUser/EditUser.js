import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	capNhatNguoiDungAction,
	layDanhSachMaLoaiNguoiDung,
	layThongTinNguoiDungEditAction,
} from "../../../../redux/actions/QuanLyNguoiDungActions";
import { BackwardOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { GROUPID } from "../../../../util/settings/config";
import { history } from "../../../../App";

export default function EditUser(props) {
	const { listLoaiNguoiDung, thongTinNguoiDungEdit } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);
	const dispatch = useDispatch();
	useEffect(() => {
		let taiKhoan = props.match.params.taiKhoan;
		dispatch(layThongTinNguoiDungEditAction(taiKhoan));

		dispatch(layDanhSachMaLoaiNguoiDung());
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: thongTinNguoiDungEdit?.taiKhoan,
			matKhau: thongTinNguoiDungEdit?.matKhau,
			email: thongTinNguoiDungEdit?.email,
			soDt: thongTinNguoiDungEdit?.soDt,
			hoTen: thongTinNguoiDungEdit?.hoTen,
			maNhom: GROUPID,
			maLoaiNguoiDung: thongTinNguoiDungEdit.maLoaiNguoiDung,
		},
		validationSchema: Yup.object().shape({
			taiKhoan: Yup.string().required("Tài khoản không được để trống!"),
			matKhau: Yup.string()
				.min(6, "Mật khẩu quá ngắn!")
				.max(12, "Mật khẩu quá dài")
				.required("Mật khẩu không được để trống!"),
			email: Yup.string().matches(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				"Email không hợp lệ!"
			),
			soDt: Yup.string()
				.matches(/^\d+$/, "Số điện thoại phải là số")
				.required("Số điện thoại không được để trống!"),
			hoTen: Yup.string().required("Họ tên không được để trống!"),
			maLoaiNguoiDung: Yup.string().required("Vui lòng chọn loại người dùng!"),
		}),
		onSubmit: (values) => {
			const action = capNhatNguoiDungAction(values);
			dispatch(action);
		},
	});

	const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
		formik;

	return (
		<div>
			<h3 className='text-3xl mb-0'>Chỉnh sửa người dùng</h3>

			<form className='mt-8' onSubmit={handleSubmit}>
				<div className='grid grid-cols-4 mb-6 gap-12'>
					<div className='col-span-2'>
						<div className='flex justify-between items-center'>
							<label htmlFor='taiKhoan' className=' text-sm'>
								Tài khoản:{" "}
							</label>
							<input
								type='text'
								id='taiKhoan'
								name='taiKhoan'
								disabled={true}
								className='w-5/6 rounded-md px-1 py-3 text-sm'
								style={{ border: "1px solid #d9d9d9" }}
								onChange={handleChange}
								value={values.taiKhoan}
							/>
						</div>
					</div>
					<div className='col-span-2'>
						<div className='flex justify-between items-center'>
							<label htmlFor='matKhau' className='text-sm'>
								Mật khẩu:{" "}
							</label>
							<input
								type='text'
								id='matKhau'
								name='matKhau'
								className='w-5/6 rounded-md px-1 py-3 text-sm'
								style={{ border: "1px solid #d9d9d9" }}
								onChange={handleChange}
								value={values.matKhau}
							/>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-4 gap-12 mb-6'>
					<div className='col-span-2'>
						<div className='flex justify-between items-center'>
							<label htmlFor='hoTen' className='text-sm'>
								Họ tên:{" "}
							</label>
							<input
								type='text'
								id='hoTen'
								name='hoTen'
								className='w-5/6 rounded-md px-1 py-3 text-sm'
								style={{ border: "1px solid #d9d9d9" }}
								onChange={handleChange}
								value={values.hoTen}
							/>
						</div>
					</div>
					<div className='col-span-2'>
						<div className='flex justify-between items-center'>
							<label htmlFor='email' className='text-sm'>
								Email:{" "}
							</label>
							<input
								type='text'
								id='email'
								name='email'
								className='w-5/6 rounded-md px-1 py-3 text-sm'
								style={{ border: "1px solid #d9d9d9" }}
								onChange={handleChange}
								value={values.email}
							/>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-4 gap-12 mb-6'>
					<div className='col-span-2'>
						<div className='flex justify-between items-center'>
							<label htmlFor='soDt' className=' text-sm'>
								Số điện thoại:{" "}
							</label>
							<input
								type='text'
								id='soDt'
								name='soDt'
								className='w-5/6 rounded-md px-1 py-3 text-sm'
								style={{ border: "1px solid #d9d9d9" }}
								onChange={handleChange}
								value={values.soDt}
							/>
						</div>
					</div>
					<div className='col-span-2'>
						<div className='flex justify-between items-center'>
							<label htmlFor='maNhom' className=' text-sm'>
								Mã nhóm:{" "}
							</label>
							<input
								type='text'
								id='maNhom'
								name='maNhom'
								disabled={true}
								className='w-5/6 rounded-md px-1 py-3 text-sm'
								onChange={handleChange}
								style={{ border: "1px solid #d9d9d9" }}
								value={GROUPID}
							/>
						</div>
					</div>
				</div>
				<div className='flex justify-between items-center mb-6'>
					<label htmlFor='maLoaiNguoiDung' className='text-sm'>
						Mã loại người dùng:{" "}
					</label>
					<select
						className='ml-6 flex-grow rounded-md px-1 py-3 text-sm'
						name='maLoaiNguoiDung'
						id='maLoaiNguoiDung'
						style={{ border: "1px solid #d9d9d9" }}
						onChange={handleChange}
						value={values.maLoaiNguoiDung}>
						<option value=''>Chọn loại người dùng</option>
						{listLoaiNguoiDung?.map((loai, index) => {
							return (
								<option value={loai.maLoaiNguoiDung} key={index}>
									{loai.tenLoai}
								</option>
							);
						})}
					</select>
				</div>
				<div className='flex justify-center'>
					<button
						className='px-2 py-3 bg-blue-500 text-white rounded-sm'
						type='submit'>
						Cập nhật
					</button>
				</div>
			</form>
			<button
				className='flex items-center px-2 py-3 text-gray-900 font-bold'
				onClick={() => {
					history.goBack();
				}}>
				<BackwardOutlined /> <span className='ml-1'>Quay lại</span>
			</button>
		</div>
	);
}
