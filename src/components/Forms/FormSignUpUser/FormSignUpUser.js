import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { SIGN_UP_USER_SAGA } from "../../../redux/constants/CyberBugs/UserConstants";
import { SET_SUBMIT_EDIT_PROJECT_FORM } from "../../../redux/constants/CyberBugs/DrawerConstants";

function FormSignUpUser(props) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: SET_SUBMIT_EDIT_PROJECT_FORM,
			submitFunction: handleSubmit,
		});
	}, []);

	const {
		values,
		touched,
		errors,
		handleChange,
		handleSubmit,
		handleBlur,
		setFieldValue,
	} = props;

	return (
		<form className='container' onSubmit={handleSubmit}>
			<div className='form-group'>
				<p>Email</p>
				<input
					className='form-control'
					name='email'
					value={values.email}
					onChange={handleChange}
				/>
				<div className='text-danger'>{errors.email}</div>
			</div>
			<div className='form-group'>
				<p>Password</p>
				<input
					className='form-control'
					name='passWord'
					value={values.passWord}
					onChange={handleChange}
				/>
				<div className='text-danger'>{errors.password}</div>
			</div>
			<div className='form-group'>
				<p>Phone number</p>
				<input
					className='form-control'
					name='phoneNumber'
					value={values.phoneNumber}
					onChange={handleChange}
				/>
			</div>
			<div className='form-group'>
				<p>Name</p>
				<input
					className='form-control'
					name='name'
					value={values.name}
					onChange={handleChange}
				/>
			</div>
		</form>
	);
}

const signUpUserFormik = withFormik({
	mapPropsToValues: (props) => {
		const { userSignUp } = props;
		return {
			email: userSignUp?.email,
			passWord: userSignUp?.passWord,
			phoneNumber: userSignUp?.phoneNumber,
			name: userSignUp?.name,
		};
	},
	validationSchema: Yup.object().shape({
		email: Yup.string().required("Email is required!").email("email invalid!"),
		passWord: Yup.string()
			.min(6, "password must have min 6 characters")
			.max(32, "password must have max 32 characters"),
	}),
	handleSubmit: (value, { props, setSubmitting }) => {
		console.log("value", value);

		//Khi người dùng bấm submit => đưa dữ liệu về BE thông qua api
		const action = {
			type: SIGN_UP_USER_SAGA,
			userSignUp: value,
		};
		// // //Gọi saga
		props.dispatch(action);
	},
	displayName: "SignUpUserFormik",
})(FormSignUpUser);

const mapStateToProps = (state) => {
	return {
		userSignUp: state.UserLoginCyberBugsReducer.userSignUp,
	};
};

export default connect(mapStateToProps)(signUpUserFormik);
