import React, { useState } from "react";
import { Form, Input, Radio, DatePicker, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { themPhimUpLoadHinhAction } from "../../../../redux/actions/QuanLyPhimActions";
import { GROUPID } from "../../../../util/settings/config";

export default function AddNew(props) {
	const [componentSize, setComponentSize] = useState("default");
	const [imgSrc, setImgSrc] = useState(null);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			tenPhim: "",
			trailer: "",
			moTa: "",
			ngayKhoiChieu: "",
			dangChieu: false,
			sapChieu: false,
			hot: false,
			danhGia: 0,
			hinhAnh: {},
			// maNhom: GROUPID,
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
					formData.append("File", values.hinhAnh, values.hinhAnh.name);
				}
			}

			//Gọi api gửi các giá trị formData về back-end

			dispatch(themPhimUpLoadHinhAction(formData));
		},
	});

	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

	const handleChangeDatePicker = (value) => {
		let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");

		formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
	};

	const handleChangeSwitch = (name) => {
		return (value) => formik.setFieldValue(name, value);
	};

	// const handleChangeInputNumber = (name) => {
	//     return value => formik.setFieldValue(name, value);
	// }
	const handleChangeFile = (e) => {
		// Lấy file từ e
		let file = e.target.files[0];

		if (
			file.type === "image/jpeg" ||
			file.type === "image/png" ||
			file.type === "image/gif"
		) {
			//Tạo 1 đối tượng để đọc file
			let reader = new FileReader();
			//Đọc file từ url
			reader.readAsDataURL(file);

			//Trả file về định dạng base64
			reader.onload = (e) => {
				// console.log(e.target.result);
				setImgSrc(e.target.result);
			};

			//Đem dữ liệu file lưu vào formik
			formik.setFieldValue("hinhAnh", file);
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
				<Input name='tenPhim' onChange={formik.handleChange} />
			</Form.Item>
			<Form.Item label='Trailer'>
				<Input name='trailer' onChange={formik.handleChange} />
			</Form.Item>
			<Form.Item label='Mô tả'>
				<Input name='moTa' onChange={formik.handleChange} />
			</Form.Item>
			<Form.Item label='Ngày khởi chiếu'>
				<DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
			</Form.Item>
			<Form.Item label='Đang chiếu' valuePropName='checked'>
				<Switch
					// name='dangChieu'
					onChange={handleChangeSwitch("dangChieu")}
					// onChange={(value) => {
					//     console.log("value", value);
					//     // formik.setFieldValue('dangChieu', value)

					// }}
				/>
			</Form.Item>
			<Form.Item label='Sắp chiếu' valuePropName='checked'>
				<Switch
					// name='sapChieu'
					onChange={handleChangeSwitch("sapChieu")}
				/>
			</Form.Item>
			<Form.Item label='Hot' valuePropName='checked'>
				<Switch
					// name='hot'
					onChange={handleChangeSwitch("hot")}
				/>
			</Form.Item>
			<Form.Item label='Đánh giá'>
				<InputNumber
					max={10}
					min={0}
					onChange={handleChangeSwitch("danhGia")}
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
					src={imgSrc}
					alt='...'
				/>
			</Form.Item>
			<Form.Item label='Tác vụ'>
				<button type='submit' className='bg-blue-300 text-white p-2'>
					Thêm phim
				</button>
			</Form.Item>
		</Form>
	);
}
