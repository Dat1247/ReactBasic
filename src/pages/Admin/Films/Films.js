import React, { Fragment, useEffect } from "react";

import { Button, Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimAction } from "../../../redux/actions/QuanLyPhimActions";
import { NavLink } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { history } from "../../../App";

const { Search } = Input;

export default function Dashboard(props) {
	const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(layDanhSachPhimAction());
	}, []);

	const columns = [
		{
			title: "Mã phim",
			dataIndex: "maPhim",
			// specify the condition of filtering result
			// here is that finding the name started with `value`
			sorter: (a, b) => a.maPhim - b.maPhim,
			sortDirections: ["ascend", "descend"],
			width: "10%",
		},
		{
			title: "Hình ảnh",
			dataIndex: "hinhAnh",
			width: "10%",

			render: (text, film, index) => {
				return (
					<Fragment>
						<img
							src={film.hinhAnh}
							alt={film.tenPhim}
							width={50}
							height={50}
							key={index}
							onError={(e) => {
								e.target.onError = null;
								e.target.src = `https://picsum.photos/id/${index}/50/50`;
							}}
						/>
					</Fragment>
				);
			},
		},
		{
			title: "Tên phim",
			dataIndex: "tenPhim",
			sorter: (a, b) => {
				let tenPhimA = a.tenPhim.toLowerCase().trim();
				let tenPhimB = b.tenPhim.toLowerCase().trim();
				if (tenPhimA > tenPhimB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["ascend", "descend"],
			width: "25%",
		},
		{
			title: "Mô tả",
			dataIndex: "moTa",
			sorter: (a, b) => {
				let moTaA = a.moTa.toLowerCase().trim();
				let moTaB = b.moTa.toLowerCase().trim();
				if (moTaA > moTaB) {
					return 1;
				}
				return -1;
			},
			render: (text, film, index) => {
				return (
					<div key={index}>
						{film.moTa.length > 50
							? film.moTa?.substr(0, 50) + " ..."
							: film.moTa}
					</div>
				);
			},
			sortDirections: ["ascend", "descend"],
			width: "25%",
		},
		{
			title: "",
			dataIndex: "action",
			render: (text, film, index) => {
				return (
					<Fragment key={index}>
						<NavLink
							key={1}
							to={`/admin/films/edit/${film.maPhim}`}
							className='text-blue-600 text-2xl p-3 mr-2 '>
							<EditOutlined />
						</NavLink>
						<NavLink key={2} to='/' className='text-red-500 text-2xl p-3'>
							<DeleteOutlined />
						</NavLink>
					</Fragment>
				);
			},
			width: "20%",
		},
	];

	const data = arrFilmDefault;
	function onChange(pagination, filters, sorter, extra) {
		console.log("params", pagination, filters, sorter, extra);
	}
	const onSearch = (value) => console.log(value);
	return (
		<div>
			<h3 className='text-3xl'>Quản lý phim</h3>
			<Button
				className='mb-5'
				onClick={() => {
					history.push("/admin/films/addnew");
				}}>
				Thêm phim
			</Button>
			<Search
				className='mb-5'
				placeholder='input search text'
				allowClear
				enterButton='Tìm kiếm'
				size='large'
				onSearch={onSearch}
			/>
			<Table columns={columns} dataSource={data} onChange={onChange} />;
		</div>
	);
}
