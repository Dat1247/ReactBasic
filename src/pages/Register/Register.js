import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { history } from "../../App";
import { dangKyAction } from "../../redux/actions/QuanLyNguoiDungActions";

import * as Yup from "yup";
import { GROUPID } from "../../util/settings/config";

export default function Register(props) {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			email: "",
			soDT: "",
			hoTen: "",
			maNhom: GROUPID,
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
			soDT: Yup.string()
				.matches(/^\d+$/, "Số điện thoại phải là số")
				.required("Số điện thoại không được để trống!"),
			hoTen: Yup.string().required("Họ tên không được để trống!"),
		}),
		onSubmit: (values) => {
			const action = dangKyAction(values);
			dispatch(action);
		},
	});

	const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
		formik;

	return (
		<div className='lg:w-1/2 xl:max-w-screen-sm'>
			<div className='py-8 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12'>
				<div
					className='cursor-pointer flex items-center'
					onClick={() => {
						history.push("/");
					}}>
					<div>
						<svg
							className='w-10 text-indigo-500'
							xmlns='http://www.w3.org/2000/svg'
							xmlnsXlink='http://www.w3.org/1999/xlink'
							version='1.1'
							id='Layer_1'
							x='0px'
							y='0px'
							viewBox='0 0 225 225'
							style={{ enableBackground: "new 0 0 225 225" }}
							xmlSpace='preserve'>
							<style
								type='text/css'
								dangerouslySetInnerHTML={{
									__html:
										"\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
								}}
							/>
							<g transform='matrix( 1, 0, 0, 1, 0,0) '>
								<g>
									<path
										id='Layer0_0_1_STROKES'
										className='st0'
										d='M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8'
									/>
								</g>
							</g>
						</svg>
					</div>
					<div className='text-2xl text-indigo-800 tracking-wide ml-2 font-semibold'>
						CYBERLEARN
					</div>
				</div>
			</div>
			<div className=' px-12 sm:px-24 md:px-48 lg:px-12  xl:px-24 xl:max-w-2xl'>
				<h2
					className='text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
xl:text-bold'>
					ĐĂNG KÝ
				</h2>
				<div className='mt-8'>
					<form onSubmit={handleSubmit}>
						<div>
							<div className='text-sm font-bold text-gray-700 tracking-wide'>
								Họ tên
							</div>

							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='hoTen'
								onChange={handleChange}
								placeholder='Nhập vào họ tên'
							/>
							{errors.hoTen && touched.hoTen ? (
								<div className='text-red-500 text-xs'>{errors.hoTen}</div>
							) : null}
						</div>
						<div className='mt-6'>
							<div className='text-sm font-bold text-gray-700 tracking-wide'>
								Tài khoản
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='taiKhoan'
								onChange={handleChange}
								placeholder='Nhập vào tài khoản'
							/>
							{errors.taiKhoan && touched.taiKhoan ? (
								<div className='text-red-500 text-xs'>{errors.taiKhoan}</div>
							) : null}
						</div>
						<div className='mt-6'>
							<div className='text-sm font-bold text-gray-700 tracking-wide'>
								Mật khẩu
							</div>

							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='matKhau'
								onChange={handleChange}
								placeholder='Nhập vào mật khẩu'
							/>
							{errors.matKhau && touched.matKhau ? (
								<div className='text-red-500 text-xs'>{errors.matKhau}</div>
							) : null}
						</div>
						<div className='mt-6'>
							<div className='text-sm font-bold text-gray-700 tracking-wide'>
								Email
							</div>

							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='email'
								onChange={handleChange}
								placeholder='Nhập vào email'
							/>
							{errors.email && touched.email ? (
								<div className='text-red-500 text-xs'>{errors.email}</div>
							) : null}
						</div>
						<div className='mt-6'>
							<div className='text-sm font-bold text-gray-700 tracking-wide'>
								Số điện thoại
							</div>

							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='soDT'
								onChange={handleChange}
								placeholder='Nhập vào số điện thoại'
							/>
							{errors.soDT && touched.soDT ? (
								<div className='text-red-500 text-xs'>{errors.soDT}</div>
							) : null}
						</div>

						<div className='mt-10'>
							<button
								type='submit'
								className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
shadow-lg'>
								Đăng ký
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
