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
