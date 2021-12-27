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

const { Header, Sider, Content } = Layout;

export default function SibebarCyberBugs() {
	const [state, setState] = useState({
		collapsed: true,
	});

	const toggle = () => {
		setState({
			collapsed: !state.collapsed,
		});
	};
	return (
		// <div className='sideBar'>
		// 	<div className='sideBar-top'>
		// 		<div className='sideBar-icon'>
		// 			<i className='fab fa-jira' />
		// 		</div>
		// 		<div
		// 			className='sideBar-icon'
		// 			data-toggle='modal'
		// 			data-target='#searchModal'
		// 			style={{ cursor: "pointer" }}>
		// 			<i className='fa fa-search' />
		// 			<span className='title'>SEARCH ISSUES</span>
		// 		</div>
		// 		<div className='sideBar-icon'>
		// 			<i className='fa fa-plus' />
		// 			<span className='title'>CREATE ISSUES</span>
		// 		</div>
		// 	</div>
		// 	<div className='sideBar-bottom'>
		// 		<div className='sideBar-icon'>
		// 			<i className='fa fa-question-circle' />
		// 			<span className='title'>ABOUT</span>
		// 		</div>
		// 	</div>
		// </div>
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
				<Menu theme='dark' mode='inline' defaultSelectedKeys={["1"]}>
					<Menu.Item key='1' icon={<PlusOutlined />}>
						Create issue
					</Menu.Item>
					<Menu.Item key='2' icon={<SearchOutlined />}>
						Search
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className='site-layout'>
				<Header className='site-layout-background' style={{ padding: 0 }}>
					{React.createElement(
						state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: "trigger",
							onClick: toggle,
						}
					)}
				</Header>
				<Content
					className='site-layout-background'
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
					}}>
					Content
				</Content>
			</Layout>
		</Layout>
	);
}
