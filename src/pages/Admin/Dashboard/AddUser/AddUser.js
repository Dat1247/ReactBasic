import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	layDanhSachMaLoaiNguoiDung,
	themNguoiDungAction,
} from "../../../../redux/actions/QuanLyNguoiDungActions";
import * as Yup from "yup";
import { GROUPID } from "../../../../util/settings/config";

export default function AddUser(props) {
	const { listLoaiNguoiDung } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(layDanhSachMaLoaiNguoiDung());
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			email: "",
			soDt: "",
			hoTen: "",
			maNhom: GROUPID,
			maLoaiNguoiDung: "",
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
			const action = themNguoiDungAction(values);
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
								className='w-5/6 rounded-md px-1 py-3 text-sm'
								onChange={handleChange}
								style={{ border: "1px solid #d9d9d9" }}
							/>
						</div>
						{errors.taiKhoan && touched.taiKhoan ? (
							<div
								className='text-red-500 text-xs'
								style={{ marginLeft: "100px" }}>
								{errors.taiKhoan}
							</div>
						) : null}
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
								onChange={handleChange}
								style={{ border: "1px solid #d9d9d9" }}
							/>
						</div>
						{errors.matKhau && touched.matKhau ? (
							<div
								className='text-red-500 text-xs'
								style={{ marginLeft: "100px" }}>
								{errors.matKhau}
							</div>
						) : null}
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
								onChange={handleChange}
								style={{ border: "1px solid #d9d9d9" }}
							/>
						</div>
						{errors.hoTen && touched.hoTen ? (
							<div
								className='text-red-500 text-xs'
								style={{ marginLeft: "100px" }}>
								{errors.hoTen}
							</div>
						) : null}
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
								onChange={handleChange}
								style={{ border: "1px solid #d9d9d9" }}
							/>
						</div>
						{errors.email && touched.email ? (
							<div
								className='text-red-500 text-xs'
								style={{ marginLeft: "100px" }}>
								{errors.email}
							</div>
						) : null}
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
								onChange={handleChange}
								style={{ border: "1px solid #d9d9d9" }}
							/>
						</div>
						{errors.soDt && touched.soDt ? (
							<div
								className='text-red-500 text-xs'
								style={{ marginLeft: "100px" }}>
								{errors.soDt}
							</div>
						) : null}
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

				<div className='mb-6'>
					<div className='flex justify-between items-center'>
						<label htmlFor='maLoaiNguoiDung' className='text-sm'>
							Mã loại người dùng:{" "}
						</label>
						<select
							className='ml-6 flex-grow rounded-md px-1 py-3 text-sm'
							name='maLoaiNguoiDung'
							id='maLoaiNguoiDung'
							style={{ border: "1px solid #d9d9d9" }}
							onChange={handleChange}>
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
					{errors.maLoaiNguoiDung && touched.maLoaiNguoiDung ? (
						<div
							className='text-red-500 text-xs'
							style={{ marginLeft: "150px" }}>
							{errors.maLoaiNguoiDung}
						</div>
					) : null}
				</div>

				<div className='flex justify-center'>
					<button
						className='px-3 py-3 bg-green-500 text-white rounded-sm font-bold'
						type='submit'>
						Thêm
					</button>
				</div>
			</form>
		</div>
	);
}
