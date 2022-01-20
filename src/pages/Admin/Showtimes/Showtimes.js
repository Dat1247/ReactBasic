import React, { useEffect, useState, Fragment } from "react";
import { Form, Button, DatePicker, Space, InputNumber, Select } from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";

export default function Showtimes(props) {
	const formik = useFormik({
		initialValues: {
			maPhim: props.match.params.id,
			ngayChieuGioChieu: "",
			maRap: "",
			giaVe: "",
		},
		onSubmit: async (values) => {
			try {
				const result = await quanLyDatVeService.taoLichChieu(values);

				alert("Tạo lịch chiếu thành công!");
				console.log(result);
			} catch (err) {
				console.log(err);
			}
		},
	});

	const [state, setState] = useState({
		heThongRapChieu: [],
		cumRapChieu: [],
	});

	useEffect(() => {
		async function layThongTinHeThongRap() {
			try {
				let result = await quanLyRapService.layThongTinHeThongRap();

				setState({
					...state,
					heThongRapChieu: result.data.content,
				});
			} catch (err) {
				console.log(err);
			}
		}
		layThongTinHeThongRap();
	}, []);

	const handleChangeHeThongRap = async (value) => {
		//Từ hệ thống rạp call api lấy thông tin cụm rạp
		try {
			let result = await quanLyRapService.layThongTinCumRap(value);

			//Gán giá trị cụm rạp
			setState({
				...state,
				cumRapChieu: result.data.content,
			});
		} catch (error) {
			console.log(error.response?.data);
		}
	};

	const handleChangeCumRap = (value) => {
		formik.setFieldValue("maRap", value);
	};

	const onChangeDate = (value, dateString) => {
		formik.setFieldValue(
			"ngayChieuGioChieu",
			moment(value).format("DD/MM/YYYY hh:mm:ss")
		);
	};

	const onOk = (value) => {
		formik.setFieldValue(
			"ngayChieuGioChieu",
			moment(value).format("DD/MM/YYYY hh:mm:ss")
		);
	};
	const onChangeGiaVe = (value) => {
		formik.setFieldValue("giaVe", value);
	};

	const convertSelectHTR = () => {
		return state.heThongRapChieu?.map((heThongRap, index) => {
			return {
				label: heThongRap.tenHeThongRap,
				value: heThongRap.maHeThongRap,
			};
		});
	};

	let filmParams = {};
	if (localStorage.getItem("filmParams")) {
		filmParams = JSON.parse(localStorage.getItem("filmParams"));
	}

	return (
		<Fragment>
			<h3 className='text-2xl mb-5'>
				Tạo lịch chiếu -{" "}
				<span className='text-3xl text-blue-800'>{filmParams.tenPhim}</span>
			</h3>
			<div className='grid grid-cols-6'>
				<img
					className='col-span-2 w-full'
					src={filmParams.hinhAnh}
					alt={filmParams.tenPhim}
				/>

				<Form
					className='col-span-4'
					name='basic'
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					onSubmitCapture={formik.handleSubmit}>
					<Form.Item label='Hệ thống rạp'>
						<Select
							options={convertSelectHTR()}
							onChange={handleChangeHeThongRap}
							placeholder='Chọn hệ thống rạp'
						/>
					</Form.Item>
					<Form.Item label='Cụm rạp'>
						<Select
							options={state.cumRapChieu?.map((cumRap, index) => ({
								label: cumRap.tenCumRap,
								value: cumRap.maCumRap,
							}))}
							onChange={handleChangeCumRap}
							placeholder='Chọn cụm rạp'
						/>
					</Form.Item>
					<Form.Item label='Ngày chiếu giờ chiếu'>
						<Space direction='vertical' size={12}>
							<DatePicker
								format='DD/MM/YYYY hh:mm:ss'
								showTime
								onChange={onChangeDate}
								onOk={onOk}
							/>
						</Space>
					</Form.Item>
					<Form.Item label='Giá vé'>
						<InputNumber min={75000} max={150000} onChange={onChangeGiaVe} />
					</Form.Item>
					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}>
						<Button type='primary' htmlType='submit'>
							Tạo lịch chiếu
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Fragment>
	);
}
