import { withFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import { EDIT_USER_SAGA } from "../../../redux/constants/CyberBugs/UserConstants";
import { useEffect } from "react";
import { SET_SUBMIT_EDIT_PROJECT_FORM } from "../../../redux/constants/CyberBugs/DrawerConstants";

function FormEditUser(props) {
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
				<p>ID</p>
				<input className='form-control' name='id' disabled value={values.id} />
			</div>
			<div className='form-group'>
				<p>Email</p>
				<input
					className='form-control'
					name='email'
					value={values.email}
					onChange={handleChange}
				/>
			</div>
			<div className='form-group'>
				<p>Password</p>
				<input
					className='form-control'
					name='passWord'
					value={values.passWord ? values.passWord : ""}
					onChange={handleChange}
				/>
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

const editUserForm = withFormik({
	mapPropsToValues: (props) => {
		const { editUser } = props;
		return {
			id: editUser?.userId,
			email: editUser?.email,
			passWord: editUser?.passWord,
			phoneNumber: editUser?.phoneNumber,
			name: editUser?.name,
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
			type: EDIT_USER_SAGA,
			userEdit: value,
		};
		// //Gọi saga
		props.dispatch(action);
	},
	displayName: "EditUserFormik",
})(FormEditUser);

const mapStateToProps = (state) => {
	return {
		editUser: state.UserLoginCyberBugsReducer.editUser,
	};
};

export default connect(mapStateToProps)(editUserForm);
