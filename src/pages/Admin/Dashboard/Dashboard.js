import React, { useEffect, Fragment } from "react";
import { Table, Tag, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	layDanhSachNguoiDungAction,
	xoaNguoiDungAction,
} from "../../../redux/actions/QuanLyNguoiDungActions";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";

const { Search } = Input;

export default function Dashboard(props) {
	const { danhSachNguoiDungDefault } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		const action = layDanhSachNguoiDungAction();
		dispatch(action);
	}, []);

	const columns = [
		{
			title: "Họ tên",
			dataIndex: "hoTen",
			key: "hoTen",
			// specify the condition of filtering result
			// here is that finding the name started with `value`
			sorter: (a, b) => {
				let hoTenA = a.hoTen.toLowerCase().trim();
				let hoTenB = b.hoTen.toLowerCase().trim();
				if (hoTenA > hoTenB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "15%",
		},
		{
			title: "Tài khoản",
			dataIndex: "taiKhoan",
			key: "taiKhoan",

			sorter: (a, b) => {
				let taiKhoanA = a.taiKhoan.toLowerCase().trim();
				let taiKhoanB = b.taiKhoan.toLowerCase().trim();
				if (taiKhoanA > taiKhoanB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "15%",
		},
		{
			title: "Mật khẩu",
			dataIndex: "matKhau",
			key: "matKhau",
			width: "10%",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			width: "20%",
		},
		{
			title: "Số điện thoại",
			dataIndex: "soDt",
			key: "soDt",
			width: "10%",
		},
		{
			title: "Loại người dùng",
			dataIndex: "maLoaiNguoiDung",
			key: "maLoaiNguoiDung",
			filters: [
				{
					text: "Quản Trị",
					value: "QuanTri",
				},
				{
					text: "Khách hàng",
					value: "KhachHang",
				},
			],
			onFilter: (value, record) => {
				return record.maLoaiNguoiDung.indexOf(value) === 0;
			},
			render: (maLoai) => {
				let color = maLoai === "QuanTri" ? "blue" : "green";
				return (
					<Tag color={color} key={maLoai}>
						{maLoai}
					</Tag>
				);
			},

			width: "15%",
		},
		{
			title: "",
			dataIndex: "action",
			key: "action",
			render: (text, nguoiDung, index) => {
				return (
					<Fragment key={index}>
						<NavLink
							key={1}
							to={`/admin/users/edit/${nguoiDung.taiKhoan}`}
							className='text-blue-600 text-2xl p-3'>
							<EditOutlined />
						</NavLink>
						<span
							key={2}
							onClick={() => {
								//Goi action xoa
								if (
									window.confirm(
										"Bạn có chắc muốn xóa người dùng " + nguoiDung.hoTen + "?"
									)
								) {
									dispatch(xoaNguoiDungAction(nguoiDung.taiKhoan));
								}
							}}
							style={{ cursor: "pointer" }}
							className='text-red-500 text-2xl p-3'>
							<DeleteOutlined />
						</span>
					</Fragment>
				);
			},
			width: "15%",
		},
	];

	function onChange(pagination, filters, sorter, extra) {}
	const onSearch = (value) => {
		//Goi api lay danh sach nguoi dung
		dispatch(layDanhSachNguoiDungAction(value));
	};

	return (
		<div>
			<h3 className='text-3xl mb-0'>DANH SÁCH NGƯỜI DÙNG</h3>
			<button
				className='bg-blue-500 text-white font-bold  p-3 my-3 hover:bg-blue-300'
				onClick={() => {
					history.push("/admin/users/adduser");
					// history.push(`/admin/users/edit/${null}`);
				}}>
				Thêm người dùng
			</button>
			<Search
				className='mb-5'
				placeholder='Tìm kiếm người dùng'
				allowClear
				enterButton='Tìm kiếm'
				size='large'
				onSearch={onSearch}
			/>
			<Table
				columns={columns}
				dataSource={danhSachNguoiDungDefault}
				onChange={onChange}
				rowKey={"taiKhoan"}
			/>
		</div>
	);
}
