import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	capNhatNguoiDungAction,
	layThongTinNguoiDungAction,
} from "../../redux/actions/QuanLyNguoiDungActions";
import { Tabs, Form, Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";
import moment from "moment";
import _ from "lodash";
import "@tsamantanis/react-glassmorphism/dist/index.css";

const { TabPane } = Tabs;

export default function Profile(props) {
	const { thongTinNguoiDung, userLogin } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		let action = layThongTinNguoiDungAction();
		dispatch(action);
	}, []);

	if (!localStorage.getItem(USER_LOGIN)) {
		alert("Bạn cần đăng nhập để truy cập vào trang này!");
		return <Redirect to='/login' />;
	}

	return (
		<div>
			<div
				style={{
					backgroundImage: "url('https://picsum.photos/2000')",
					height: "350px",
					color: "#fff",
					lineHeight: "160px",
					textAlign: "center",
					backgroundPosition: "center",
					backgroundSize: "100%",
					backgroundRepeat: "no-repeat",
				}}>
				<img
					src='https://picsum.photos/2000'
					className='w-full opacity-0 h-full'
					alt='banner'
				/>
			</div>
			<div className=' bg-indigo-200'>
				<div className='container py-12 px-40'>
					<Tabs defaultActiveKey='1' type='card'>
						<TabPane tab='THÔNG TIN CÁ NHÂN' key='1'>
							<ThongTinCaNhan
								{...props}
								thongTinNguoiDung={thongTinNguoiDung}
								userLogin={userLogin}
								dispatch={dispatch}
							/>
						</TabPane>
						<TabPane tab='THÔNG TIN ĐẶT VÉ' key='2'>
							<KetQuaDatVe
								{...props}
								thongTinNguoiDung={thongTinNguoiDung}
								dispatch={dispatch}
							/>
						</TabPane>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

function ThongTinCaNhan(props) {
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			hoTen: props.thongTinNguoiDung?.hoTen,
			taiKhoan: props.thongTinNguoiDung?.taiKhoan,
			matKhau: props.thongTinNguoiDung?.matKhau,
			email: props.thongTinNguoiDung?.email,
			soDT: props.thongTinNguoiDung?.soDT,
			maNhom: props.thongTinNguoiDung?.maNhom,
			maLoaiNguoiDung: props.userLogin.maLoaiNguoiDung,
		},
		validationSchema: Yup.object().shape({
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
			props.dispatch(capNhatNguoiDungAction(values));
		},
	});

	const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
		formik;

	return (
		<Form
			onSubmitCapture={handleSubmit}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 14 }}
			style={{ marginTop: "1rem" }}>
			<Form.Item label='Họ tên'>
				<Input name='hoTen' value={values.hoTen} onChange={handleChange} />
				{errors.hoTen && touched.hoTen ? (
					<div className='text-red-500 text-xs'>{errors.hoTen}</div>
				) : null}
			</Form.Item>
			<Form.Item label='Tài khoản'>
				<Input
					name='taiKhoan'
					value={values.taiKhoan}
					onChange={handleChange}
					disabled={true}
				/>
			</Form.Item>
			<Form.Item label='Mật khẩu'>
				<Input name='matKhau' value={values.matKhau} onChange={handleChange} />
				{errors.matKhau && touched.matKhau ? (
					<div className='text-red-500 text-xs'>{errors.matKhau}</div>
				) : null}
			</Form.Item>
			<Form.Item label='Email'>
				<Input name='email' value={values.email} onChange={handleChange} />
				{errors.email && touched.email ? (
					<div className='text-red-500 text-xs'>{errors.email}</div>
				) : null}
			</Form.Item>
			<Form.Item label='Số điện thoại'>
				<Input name='soDT' value={values.soDT} onChange={handleChange} />
				{errors.soDT && touched.soDT ? (
					<div className='text-red-500 text-xs'>{errors.soDT}</div>
				) : null}
			</Form.Item>
			<Form.Item label='Mã nhóm'>
				<Input
					name='maNhom'
					value={values.maNhom}
					disabled={true}
					onChange={handleChange}
				/>
			</Form.Item>
			<Form.Item label='Mã loại người dùng'>
				<Input
					name='maLoaiNguoiDung'
					value={values.maLoaiNguoiDung}
					disabled={true}
					onChange={handleChange}
				/>
			</Form.Item>
			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type='primary' htmlType='submit'>
					Cập nhật
				</Button>
			</Form.Item>
		</Form>
	);
}

function KetQuaDatVe(props) {
	const renderTicketItem = () => {
		return props.thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
			const seats = _.first(ticket.danhSachGhe);

			return (
				<div className='p-2 md:w-1/2 w-full' key={index}>
					<div
						className='h-full flex items-center border-gray-200 border p-4 rounded-lg bg-gray-100'
						style={{
							boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)",
						}}>
						<img
							alt='team'
							className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
							src={ticket.hinhAnh}
						/>
						<div className='flex-grow'>
							<h2 className='text-gray-900 title-font font-bold text-lg'>
								{ticket.tenPhim}
							</h2>
							<p className='text-gray-500'>
								Ngày đặt vé:
								{moment(ticket.ngayDat).format(" hh:mm A - DD-MM-YYYY")}
							</p>
							<p>
								Địa điểm: {seats.tenHeThongRap} - {seats.tenCumRap}
							</p>
							<p>
								Ghế:{" "}
								{ticket.danhSachGhe?.map((ghe, index) => {
									return (
										<span key={index} className='text-green-800 pr-1 font-bold'>
											{ghe.tenGhe}
										</span>
									);
								})}
							</p>
						</div>
					</div>
				</div>
			);
		});
	};
	return (
		<section className='text-gray-600 body-font' style={{ marginTop: "1rem" }}>
			<div className='container px-5 mx-auto'>
				<div className='flex flex-col text-center w-full '>
					<h1 className='sm:text-3xl text-2xl font-bold title-font mb-4 text-purple-900 text-2xl'>
						LỊCH SỬ ĐẶT VÉ
					</h1>
				</div>
				<div
					className='flex flex-col items-center m-2'
					style={{ maxHeight: 500, overflowY: "auto" }}>
					{renderTicketItem()}
				</div>
			</div>
		</section>
	);
}
