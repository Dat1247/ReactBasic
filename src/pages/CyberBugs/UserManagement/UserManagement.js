import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Popconfirm, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
	DELETE_USER_SAGA,
	EDIT_USER,
	GET_ALL_USER_SAGA,
} from "../../../redux/constants/CyberBugs/UserConstants";
import FormEditUser from "../../../components/Forms/FormEditUser/FormEditUser";
import FormSignUpUser from "../../../components/Forms/FormSignUpUser/FormSignUpUser";
import {
	OPEN_FORM_EDIT_USER,
	OPEN_FORM_SIGN_UP_USER,
} from "../../../redux/constants/CyberBugs/DrawerConstants";

export default function UserManagement(props) {
	const { userLogin, arrAllUser } = useSelector(
		(state) => state.UserLoginCyberBugsReducer
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: GET_ALL_USER_SAGA,
			keyWord: "",
		});
	}, []);

	const columns = [
		{
			title: "STT",
			key: "index",
			render: (text, record, index) => {
				// return <span>1</span>;

				return <span>{index + 1}</span>;
			},
		},
		{
			title: "ID",
			dataIndex: "userId",
			key: "userId",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Phone",
			dataIndex: "phoneNumber",
			key: "phoneNumber",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record, index) => {
				// console.log(record);
				return (
					<Space size='middle'>
						<Button
							type='primary'
							onClick={() => {
								const action = {
									type: OPEN_FORM_EDIT_USER,
									title: "Edit User",
									Component: <FormEditUser />,
								};

								//dispatch lên reducer
								dispatch(action);

								//dispatch dữ liệu dòng hiện tại lên reducer
								const actionEditUser = {
									type: EDIT_USER,
									editUser: record,
								};
								dispatch(actionEditUser);
							}}>
							Edit
						</Button>

						<Popconfirm
							title='Are you sure to delete this user?'
							onConfirm={() => {
								dispatch({
									type: DELETE_USER_SAGA,
									userId: record.userId,
								});
							}}
							// onCancel={cancel}
							okText='Yes'
							cancelText='No'>
							<Button type='primary' danger>
								Delete
							</Button>
						</Popconfirm>
					</Space>
				);
			},
		},
	];

	const handleSubmitSearch = (e) => {
		e.preventDefault();
		//.firstElementChild.target.value
		let searchValue = e.target.firstElementChild.value;
		dispatch({
			type: GET_ALL_USER_SAGA,
			keyWord: searchValue,
		});
	};

	return (
		<div className='container-fluid'>
			<div
				className='header'
				style={{ backgroundColor: "pink", width: "100%" }}>
				<div
					className='text-right p-3'
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
					}}>
					Chào !, <span className='font-weight-bold'> {userLogin.name}</span>
					<img
						className='mx-2'
						src={userLogin.avatar}
						alt={userLogin.name}
						style={{ width: 35, height: 35, borderRadius: "50%" }}
					/>
					<i className='fa fa-caret-down ' style={{ fontSize: 30 }}></i>
				</div>
			</div>
			<button
				className='my-3 btn btn-primary'
				onClick={() => {
					const action = {
						type: OPEN_FORM_SIGN_UP_USER,
						title: "Sign up User",
						Component: <FormSignUpUser />,
					};
					dispatch(action);
				}}>
				Create user
			</button>
			<form className='form-group d-flex' onSubmit={handleSubmitSearch}>
				<input
					type='text'
					className='form-control mr-2'
					placeholder='Search...'
				/>
				<button type='submit' className='btn btn-primary'>
					Search
				</button>
			</form>
			<Table
				bordered='true'
				rowKey={"userId"}
				dataSource={arrAllUser}
				columns={columns}
			/>
		</div>
	);
}
