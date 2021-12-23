import React from "react";
import { Input, Button } from "antd";
import {
	UserOutlined,
	LockOutlined,
	FacebookOutlined,
	TwitterOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import { singinCyberbugAction } from "../../../redux/actions/CyberBugsAction";

function LoginCyberBugs(props) {
	const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
		props;
	return (
		<form onSubmit={handleSubmit} className='container'>
			<div
				className='d-flex align-items-center justify-content-center'
				style={{ height: window.innerHeight }}>
				<div>
					<h3 className='text-center'>Login to continue</h3>
					<Input
						onChange={handleChange}
						size='large'
						name='email'
						type='email'
						placeholder='Email'
						prefix={<UserOutlined />}
					/>

					<div className='text-danger'>{errors.email}</div>
					<Input
						className='my-3'
						onChange={handleChange}
						name='password'
						type='password'
						size='large'
						placeholder='Password'
						prefix={<LockOutlined />}
					/>
					<div className='text-danger'>{errors.password}</div>

					<Button
						htmlType='submit'
						size='large'
						type='primary'
						style={{ width: "100%" }}>
						Log in
					</Button>
					<div className='social mt-3 d-flex justify-content-center'>
						<Button
							className='mr-3'
							style={{ backgroundColor: "rgb(59,89,152)", color: "#fff" }}
							shape='circle'
							icon={<FacebookOutlined />}
							size='large'
						/>
						<Button
							type='primary'
							shape='circle'
							icon={<TwitterOutlined />}
							size='large'></Button>
					</div>
				</div>
			</div>
		</form>
	);
}

const LoginCyberBugsWithFormik = withFormik({
	mapPropsToValues: () => ({ email: "", password: "" }),

	validationSchema: Yup.object().shape({
		email: Yup.string().required("Email is required!").email("email invalid!"),
		password: Yup.string()
			.min(6, "password must have min 6 characters")
			.max(32, "password must have max 32 characters"),
	}),

	handleSubmit: (values, { props, setSubmitting }) => {
		// let action = {
		// 	type: USER_SIGNIN_API,
		// 	userLogin: {
		// 		email: values.email,
		// 		password: values.password,
		// 	},
		// };

		// props.dispatch(action);
		props.dispatch(singinCyberbugAction(values.email, values.password));
		// console.log(values);
	},

	displayName: "LoginCyberbugs",
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);
