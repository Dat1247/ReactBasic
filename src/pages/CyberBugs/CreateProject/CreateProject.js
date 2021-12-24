import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constants/CyberBugs/CyberBugsConstants";

function CreateProject(props) {
	const arrProjectCategory = useSelector(
		(state) => state.ProjectCyberbugsReducer.arrProjectCategory
	);
	const dispatch = useDispatch();

	const {
		values,
		touched,
		errors,
		handleChange,
		handleSubmit,
		handleBlur,
		setFieldValue,
	} = props;

	useEffect(() => {
		//Gọi api để lấy dữ liệu
		dispatch({
			type: GET_ALL_PROJECT_CATEGORY_SAGA,
		});
	}, []);

	const handleEditorChange = (content, editor) => {
		setFieldValue("description", content);
	};
	return (
		<div className='container m-5'>
			<h3>Create Project</h3>
			<form className='container' onSubmit={handleSubmit}>
				<div className='form-group'>
					<p>Name</p>
					<input
						type='text'
						onChange={handleChange}
						className='form-control'
						name='projectName'
					/>
				</div>
				<div className='form-group'>
					<p>Description</p>

					<Editor
						name='description'
						initialValue=''
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
				<div className='form-group'>
					<select
						name='categoryId'
						className='form-control'
						onChange={handleChange}>
						{arrProjectCategory.map((item, index) => {
							return (
								<option value={item.id} key={index}>
									{item.projectCategoryName}
								</option>
							);
						})}
					</select>
				</div>
				<button type='submit' className='btn btn-primary'>
					Create project
				</button>
			</form>
		</div>
	);
}

const createProjectForm = withFormik({
	enableReinitialize: true,
	mapPropsToValues: (props) => {
		console.log(props);
		return {
			projectName: "",
			description: "",
			categoryId: props.arrProjectCategory[0]?.id,
		};
	},
	validationSchema: Yup.object().shape({}),
	handleSubmit: (value, { props, setSubmitting }) => {
		// console.log("props", props);
		console.log("value", value);
		props.dispatch({
			type: "CREATE_PROJECT_SAGA",
			newProject: value,
		});
	},
	displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => {
	return {
		arrProjectCategory: state.ProjectCyberbugsReducer.arrProjectCategory,
	};
};

export default connect(mapStateToProps)(createProjectForm);
