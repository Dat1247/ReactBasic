import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector, connect } from "react-redux";
import {
	CREATE_PROJECT_SAGA,
	GET_ALL_PROJECT_CATEGORY_SAGA,
	UPDATE_LIST_PROJECT_SAGA,
} from "../../../redux/constants/CyberBugs/CyberBugsConstants";
import { SET_SUBMIT_EDIT_PROJECT_FORM } from "../../../redux/constants/CyberBugs/DrawerConstants";

function FormEditProject(props) {
	const {
		values,
		touched,
		errors,
		handleChange,
		handleSubmit,
		handleBlur,
		setFieldValue,
	} = props;

	const arrProjectCategory = useSelector(
		(state) => state.ProjectCyberbugsReducer.arrProjectCategory
	);

	const dispatch = useDispatch();

	const submitForm = (e) => {
		e.preventDefault();
		alert("submit");
	};
	useEffect(() => {
		// Gọi api load project category
		dispatch({
			type: GET_ALL_PROJECT_CATEGORY_SAGA,
		});

		// Load sự kiện submit lên drawer = nút submit
		dispatch({
			type: SET_SUBMIT_EDIT_PROJECT_FORM,
			submitFunction: handleSubmit,
		});
	}, []);

	const handleEditorChange = (content, editor) => {
		setFieldValue("description", content);
	};

	return (
		<form className='container-fluid' onSubmit={handleSubmit}>
			<div className='row'>
				<div className='col-6'>
					<div className='form-group'>
						<p className='font-weight-bold'>Project ID</p>
						<input
							value={values.id}
							type='text'
							disabled
							className='form-control'
							name='id'
						/>
					</div>
				</div>
				<div className='col-6'>
					<div className='form-group'>
						<p className='font-weight-bold'>Project name</p>
						<input
							value={values.projectName}
							type='text'
							className='form-control'
							name='projectName'
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='col-12'>
					<div className='form-group'>
						<p className='font-weight-bold'>Project category</p>
						<select
							value={values.categoryId}
							className='form-control'
							onChange={handleChange}
							name='categoryId'>
							{arrProjectCategory?.map((item, index) => {
								return (
									<option key={index} value={item.id}>
										{item.projectCategoryName}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className='col-12'>
					<div className='form-group'>
						<p className='font-weight-bold'>Description</p>

						<Editor
							name='description'
							initialValue={values.description}
							init={{
								height: 500,
								menubar: false,
								plugins: [
									"advlist autolink lists link image charmap print preview anchor",
									"searchreplace visualblocks code fullscreen",
									"insertdatetime media table paste code help wordcount",
								],
								toolbar:
									"undo redo | formatselect | " +
									"bold italic backcolor | alignleft aligncenter " +
									"alignright alignjustify | bullist numlist outdent indent | " +
									"removeformat | help",
							}}
							onEditorChange={handleEditorChange}
						/>
					</div>
				</div>
			</div>
		</form>
	);
}

const editProjectForm = withFormik({
	enableReinitialize: true,
	mapPropsToValues: (props) => {
		console.log(props);
		const { projectEdit } = props;
		return {
			id: projectEdit?.id,
			projectName: projectEdit.projectName,
			description: projectEdit.description,
			categoryId: projectEdit?.categoryId,
		};
	},
	validationSchema: Yup.object().shape({}),
	handleSubmit: (value, { props, setSubmitting }) => {
		// console.log("value", value);
		//Khi người dùng bấm submit => đưa dữ liệu về BE thông qua api
		const action = {
			type: UPDATE_LIST_PROJECT_SAGA,
			projectUpdate: value,
		};
		//Gọi saga
		props.dispatch(action);
	},
	displayName: "EditProjectFormik",
})(FormEditProject);

const mapStateToProps = (state) => {
	return {
		projectEdit: state.ProjectReducer.projectEdit,
	};
};

export default connect(mapStateToProps)(editProjectForm);
