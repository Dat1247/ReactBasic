import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	SearchOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";

const { Header, Sider, Content } = Layout;

export default function SibebarCyberBugs() {
	const dispatch = useDispatch();
	const [state, setState] = useState({
		collapsed: true,
	});

	const toggle = () => {
		setState({
			collapsed: !state.collapsed,
		});
	};
	return (
		<Layout>
			<Sider
				trigger={null}
				collapsible
				collapsed={state.collapsed}
				style={{ height: "100%" }}>
				<div
					className='text-right text-white pr-2'
					onClick={toggle}
					style={{ cursor: "pointer", fontSize: 20 }}>
					<MenuUnfoldOutlined />
				</div>
				<div className='logo' />
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={["1"]}
					onClick={() => {
						dispatch({
							type: "OPEN_FORM_CREATE_TASK",
							Component: <FormCreateTask />,
							title: "Create task",
						});
					}}>
					<Menu.Item key='1' icon={<PlusOutlined />}>
						Create task
					</Menu.Item>
					<Menu.Item key='2' icon={<SearchOutlined />}>
						Search
					</Menu.Item>
				</Menu>
			</Sider>
		</Layout>
	);
}
