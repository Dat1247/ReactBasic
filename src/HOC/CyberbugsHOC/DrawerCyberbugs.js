import React, { useState } from "react";
import {
	Drawer,
	Form,
	Button,
	Col,
	Row,
	Input,
	Select,
	DatePicker,
	Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

const { Option } = Select;

export default function DrawerCyberbugs(props) {
	const { visible, ComponentDrawerContent, callBackSubmit, title } =
		useSelector((state) => state.DrawerCyberbugsReducer);
	const dispatch = useDispatch();

	const showDrawer = () => {
		dispatch({
			type: "OPEN_DRAWER",
		});
	};

	const onClose = () => {
		dispatch({
			type: "CLOSE_DRAWER",
		});
	};
	return (
		<>
			<Drawer
				title={title}
				width={720}
				onClose={onClose}
				visible={visible}
				bodyStyle={{ paddingBottom: 80 }}
				extra={
					<Space>
						<Button onClick={onClose}>Cancel</Button>
						<Button onClick={callBackSubmit} type='primary'>
							Submit
						</Button>
					</Space>
				}>
				{/* Nội dung thay đổi:  */}
				{ComponentDrawerContent}
			</Drawer>
		</>
	);
}
