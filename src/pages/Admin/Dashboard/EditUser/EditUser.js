import React from "react";
import { Form, Input, Button, Select } from "antd";

export default function EditUser(props) {
	return (
		<div>
			<h3>Chỉnh sửa người dùng</h3>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				layout='horizontal'>
				<div className='flex'>
					<Form.Item label='Input' className='w-1/2'>
						<Input />
					</Form.Item>
					<Form.Item label='Input' className='w-1/2'>
						<Input />
					</Form.Item>
				</div>
				<Form.Item label='Select'>
					<Select>
						<Select.Option value='demo'>Demo</Select.Option>
					</Select>
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 9,
						span: 16,
					}}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
