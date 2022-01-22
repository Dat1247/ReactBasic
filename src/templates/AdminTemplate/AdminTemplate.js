import React, { Fragment, useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
	UserOutlined,
	PlaySquareOutlined,
	UserAddOutlined,
	AuditOutlined,
	FolderAddOutlined,
} from "@ant-design/icons";
import { NavLink, Redirect, Route } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { useSelector } from "react-redux";
import _ from "lodash";
import { history } from "../../App";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminTemplate(props) {
	const [collapsed, setCollapsed] = useState(false);
	const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

	const { Component, ...restRoute } = props;

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	if (!localStorage.getItem(USER_LOGIN)) {
		alert("Bạn không có quyền truy cập vào trang này!");
		return <Redirect to='/' />;
	}
	if (userLogin.maLoaiNguoiDung !== "QuanTri") {
		alert("Bạn không có quyền truy cập vào trang này!");
		return <Redirect to='/' />;
	}

	const onCollapse = (collapsed) => {
		// console.log(collapsed);
		setCollapsed(collapsed);
	};

	const operations = (
		<Fragment>
			{!_.isEmpty(userLogin) ? (
				<div className='flex items-center justify-end'>
					<button
						onClick={() => {
							history.push("/profile");
						}}
						className='flex items-center mr-3'>
						<div
							className='rounded-full bg-red-300 font-bold text-white flex justify-center items-center text-lg mr-3'
							style={{ width: 50, height: 50 }}>
							{userLogin.taiKhoan.substr(0, 1).toUpperCase()}
						</div>
					</button>
					<button
						onClick={() => {
							localStorage.removeItem(USER_LOGIN);
							localStorage.removeItem(TOKEN);
							history.push("/");
							window.location.reload();
						}}
						className='text-red-200'>
						Sign out
					</button>
				</div>
			) : (
				""
			)}
		</Fragment>
	);

	return (
		<Route
			{...restRoute}
			render={(propsRoute) => {
				// propsRoute return props.location, props.history, props.match
				return (
					<Fragment>
						<Layout style={{ minHeight: "100vh" }}>
							<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
								<div className='logo p-5'>
									<img
										src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png'
										alt='cyberlearn.vn'
									/>
								</div>
								<Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
									<SubMenu key='sub1' icon={<UserOutlined />} title='Users'>
										<Menu.Item key='1' icon={<AuditOutlined />}>
											<NavLink to='/admin/users'>List Users</NavLink>
										</Menu.Item>
										<Menu.Item key='2' icon={<UserAddOutlined />}>
											<NavLink to='/admin/films/addnew'>Add User</NavLink>
										</Menu.Item>
									</SubMenu>
									<SubMenu
										key='sub2'
										icon={<PlaySquareOutlined />}
										title='Films'>
										<Menu.Item key='3' icon={<PlaySquareOutlined />}>
											<NavLink to='/admin/films'>Films</NavLink>
										</Menu.Item>
										<Menu.Item key='4' icon={<FolderAddOutlined />}>
											<NavLink to='/admin/films/addnew'>Add New</NavLink>
										</Menu.Item>
									</SubMenu>
								</Menu>
							</Sider>
							<Layout className='site-layout'>
								<Header
									className='site-layout-background'
									style={{ padding: 0 }}>
									<div className='pr-10 pt-1'>{operations}</div>
								</Header>
								<Content style={{ margin: "0 16px" }}>
									<Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
									<div
										className='site-layout-background'
										style={{ padding: 24, minHeight: 360 }}>
										<Component {...propsRoute} />
									</div>
								</Content>
								<Footer style={{ textAlign: "center" }}>
									Ant Design ©2018 Created by Ant UED
								</Footer>
							</Layout>
						</Layout>
					</Fragment>
				);
			}}
		/>
	);
}
