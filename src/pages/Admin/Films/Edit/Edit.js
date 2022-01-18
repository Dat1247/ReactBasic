import React, { useEffect, useState } from "react";
import { Form, Input, Radio, DatePicker, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
	capNhatPhimUploadAction,
	layThongTinPhimAction,
	themPhimUpLoadHinhAction,
} from "../../../../redux/actions/QuanLyPhimActions";
import { GROUPID } from "../../../../util/settings/config";

export default function Edit(props) {
	const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);
	const [componentSize, setComponentSize] = useState("default");
	const [img, setImg] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		let id = props.match.params.id;
		dispatch(layThongTinPhimAction(id));
	}, []);

	console.log(thongTinPhim);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			maPhim: thongTinPhim?.maPhim,
			tenPhim: thongTinPhim?.tenPhim,
			trailer: thongTinPhim.trailer,
			moTa: thongTinPhim.moTa,
			ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
			dangChieu: thongTinPhim.dangChieu,
			sapChieu: thongTinPhim.sapChieu,
			hot: thongTinPhim.hot,
			danhGia: thongTinPhim.danhGia,
			hinhAnh: null,
			maNhom: GROUPID,
		},
		onSubmit: (values) => {
			console.log(values);
			values.maNhom = GROUPID;
			//Tạo đối tượng formData => Đưa giá trị values từ formik vào formData
			let formData = new FormData();
			for (let key in values) {
				if (key !== "hinhAnh") {
					formData.append(key, values[key]);
				} else {
					if (values.hinhAnh !== null) {
						formData.append("File", values.hinhAnh, values.hinhAnh.name);
					}
				}
			}

			//Gọi api để cập nhật các giá trị formData về back-end
			dispatch(capNhatPhimUploadAction(formData));
		},
	});

	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

	const handleChangeDatePicker = (value) => {
		let ngayKhoiChieu = moment(value);

		formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
	};

	const handleChangeSwitch = (name) => {
		return (value) => formik.setFieldValue(name, value);
	};

	// const handleChangeInputNumber = (name) => {
	//     return value => formik.setFieldValue(name, value);
	// }
	const handleChangeFile = async (e) => {
		// Lấy file từ e
		let file = e.target.files[0];

		if (
			file.type === "image/jpeg" ||
			file.type === "image/png" ||
			file.type === "image/gif"
		) {
			//Đem dữ liệu file lưu vào formik
			await formik.setFieldValue("hinhAnh", file);
			//Tạo 1 đối tượng để đọc file
			let reader = new FileReader();
			//Đọc file từ url
			reader.readAsDataURL(file);

			//Trả file về định dạng base64
			reader.onload = (e) => {
				// console.log(e.target.result);
				setImg(e.target.result);
			};
		}
	};

	return (
		<Form
			onSubmitCapture={formik.handleSubmit}
			labelCol={{
				span: 4,
			}}
			wrapperCol={{
				span: 14,
			}}
			layout='horizontal'
			initialValues={{
				size: componentSize,
			}}
			onValuesChange={onFormLayoutChange}
			size={componentSize}>
			<h3>Thêm phim mới</h3>
			<Form.Item label='Form Size' name='size'>
				<Radio.Group>
					<Radio.Button value='small'>Small</Radio.Button>
					<Radio.Button value='default'>Default</Radio.Button>
					<Radio.Button value='large'>Large</Radio.Button>
				</Radio.Group>
			</Form.Item>
			<Form.Item label='Tên phim'>
				<Input
					name='tenPhim'
					onChange={formik.handleChange}
					value={formik.values.tenPhim}
				/>
			</Form.Item>
			<Form.Item label='Trailer'>
				<Input
					name='trailer'
					onChange={formik.handleChange}
					value={formik.values.trailer}
				/>
			</Form.Item>
			<Form.Item label='Mô tả'>
				<Input
					name='moTa'
					onChange={formik.handleChange}
					value={formik.values.moTa}
				/>
			</Form.Item>
			<Form.Item label='Ngày khởi chiếu'>
				<DatePicker
					format={"DD/MM/YYYY"}
					onChange={handleChangeDatePicker}
					value={moment(formik.values.ngayKhoiChieu)}
				/>
			</Form.Item>
			<Form.Item label='Đang chiếu' valuePropName='checked'>
				<Switch
					name='dangChieu'
					onChange={handleChangeSwitch("dangChieu")}
					checked={formik.values.dangChieu}
					// onChange={(value) => {
					//     console.log("value", value);
					//     // formik.setFieldValue('dangChieu', value)

					// }}
				/>
			</Form.Item>
			<Form.Item label='Sắp chiếu' valuePropName='checked'>
				<Switch
					name='sapChieu'
					onChange={handleChangeSwitch("sapChieu")}
					checked={formik.values.sapChieu}
				/>
			</Form.Item>
			<Form.Item label='Hot' valuePropName='checked'>
				<Switch
					name='hot'
					onChange={handleChangeSwitch("hot")}
					checked={formik.values.hot}
				/>
			</Form.Item>
			<Form.Item label='Đánh giá'>
				<InputNumber
					max={10}
					min={0}
					onChange={handleChangeSwitch("danhGia")}
					value={formik.values.danhGia}
				/>
			</Form.Item>
			<Form.Item label='Hình ảnh'>
				<input
					type='file'
					onChange={handleChangeFile}
					accept='image/png, image/jpeg, image/gif'
				/>
				<img
					style={{ width: "150px", height: "150px", marginTop: 15 }}
					src={img === "" ? thongTinPhim.hinhAnh : img}
					alt='...'
				/>
			</Form.Item>
			<Form.Item label='Tác vụ'>
				<button type='submit' className='bg-blue-300 text-white p-2'>
					Cập nhật
				</button>
			</Form.Item>
		</Form>
	);
}
