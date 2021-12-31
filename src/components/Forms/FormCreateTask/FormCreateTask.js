import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import { withFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import {
	GET_ALL_PRIORITY_SAGA,
	GET_ALL_PROJECT_SAGA,
	GET_ALL_STATUS_SAGA,
	GET_ALL_TASK_TYPE_SAGA,
	GET_USER_BY_PROJECT_ID_SAGA,
} from "../../../redux/constants/CyberBugs/CyberBugsConstants";

const { Option } = Select;

function FormCreateTask(props) {
	const {
		values,
		touched,
		errors,
		handleChange,
		handleSubmit,
		handleBlur,
		setFieldValue,
	} = props;
	const { arrProject } = useSelector(
		(state) => state.ProjectListCyberbugsReducer
	);

	const { arrTaskTypes } = useSelector((state) => state.TaskTypeReducer);

	const { arrPriority } = useSelector((state) => state.PriorityReducer);

	const { arrUser } = useSelector((state) => state.UserLoginCyberBugsReducer);

	const { arrStatus } = useSelector((state) => state.StatusReducer);

	//Ham bien doi the option cho Select
	const userOptions = arrUser.map((item, index) => {
		return { value: item.userId, label: item.name };
	});

	const dispatch = useDispatch();

	const [timeTracking, setTimeTracking] = useState({
		timeTrackingSpent: 0,
		timeTrackingRemaining: 0,
	});

	useEffect(() => {
		dispatch({
			type: GET_ALL_PROJECT_SAGA,
		});
		dispatch({
			type: GET_ALL_TASK_TYPE_SAGA,
		});
		dispatch({
			type: GET_ALL_PRIORITY_SAGA,
		});
		dispatch({
			type: "GET_USER_API",
			keyWord: "",
		});
		dispatch({
			type: GET_ALL_STATUS_SAGA,
		});

		//Đưa hàm handleSubmit lên DrawerCyberbugsReducer để cập nhật lại sự kiện cho nút submit
		dispatch({
			type: "SET_SUBMIT_CREATE_TASK",
			submitFunction: handleSubmit,
		});
	}, []);

	const children = [];

	return (
		<form className='container' onSubmit={handleSubmit}>
			<div className='form-group'>
				<p>Project</p>
				<select
					className='form-control'
					name='projectId'
					onChange={(e) => {
						//Dispatch giá trị làm thay đổi user
						let { value } = e.target;
						dispatch({
							type: GET_USER_BY_PROJECT_ID_SAGA,
							projectId: value,
						});

						//Cập nhật giá trị cho project Id
						setFieldValue("projectId", e.target.value);
					}}>
					{arrProject?.map((project, index) => {
						return (
							<option value={project.id} key={index}>
								{project.projectName}
							</option>
						);
					})}
				</select>
			</div>
			<div className='form-group'>
				<p>Task name</p>
				<input
					className='form-control'
					name='taskName'
					onChange={handleChange}
				/>
			</div>
			<div className='form-group'>
				<p>Status</p>
				<select
					name='statusId'
					className='form-control'
					onChange={handleChange}>
					{arrStatus?.map((status, index) => {
						return (
							<option value={status.statusId} key={index}>
								{status.statusName}
							</option>
						);
					})}
				</select>
			</div>
			<div className='form-group'>
				<div className='row'>
					<div className='col-6'>
						<p>Priority</p>
						<select
							name='priorityId'
							className='form-control'
							onChange={handleChange}>
							{arrPriority?.map((priority, index) => {
								return (
									<option value={priority.priorityId} key={index}>
										{priority.priority}
									</option>
								);
							})}
						</select>
					</div>
					<div className='col-6'>
						<p>Task type</p>
						<select
							className='form-control'
							name='typeId'
							onChange={handleChange}>
							{arrTaskTypes?.map((taskType, index) => {
								return (
									<option value={taskType.id} key={index}>
										{taskType.taskType}
									</option>
								);
							})}
						</select>
					</div>
				</div>
			</div>
			<div className='form-group'>
				<div className='row'>
					<div className='col-6'>
						<p>Assignees</p>
						<Select
							mode='multiple'
							size='middle'
							options={userOptions}
							placeholder='Please select'
							optionFilterProp='label'
							onChange={(values) => {
								//De set value cho cac ham dac biet, ta su dung setFieldValue cua Formik
								//Set lại giá trị cho assignees
								setFieldValue("listUserAsign", values);
							}}
							onSelect={(value) => {
								console.log(value);
							}}
							style={{ width: "100%" }}>
							{children}
						</Select>
						<div className='row' style={{ marginTop: "13px" }}>
							<div className='col-12'>
								<p>Original Estimate</p>
								<input
									type='number'
									name='originalEstimate'
									defaultValue='0'
									className='form-control'
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
					<div className='col-6'>
						<p>Time tracking (hour)</p>
						<Slider
							defaultValue={30}
							value={timeTracking.timeTrackingSpent}
							max={
								Number(timeTracking.timeTrackingSpent) +
								Number(timeTracking.timeTrackingRemaining)
							}
						/>
						<div className='row'>
							<div className='col-6 text-left'>
								{timeTracking.timeTrackingSpent}h logged
							</div>
							<div className='col-6 text-right'>
								{timeTracking.timeTrackingRemaining}h remaining
							</div>
						</div>
						<div className='row'>
							<div className='col-6'>
								<p>Time spend</p>
								<input
									type='number'
									name='timeTrackingSpent'
									className='form-control'
									defaultValue='0'
									min='0'
									onChange={(e) => {
										setTimeTracking({
											...timeTracking,
											timeTrackingSpent: e.target.value,
										});
										setFieldValue("timeTrackingSpent", e.target.value);
									}}
								/>
							</div>
							<div className='col-6'>
								<p>Time remaining</p>
								<input
									type='number'
									name='timeTrackingRemaining'
									className='form-control'
									defaultValue='0'
									min='0'
									onChange={(e) => {
										setTimeTracking({
											...timeTracking,
											timeTrackingRemaining: e.target.value,
										});
										setFieldValue("timeTrackingRemaining", e.target.value);
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='form-group'>
				<p>Description</p>
				<Editor
					name='description'
					initialValue=''
					init={{
						height: 300,
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
					onEditorChange={(content, editor) => {
						setFieldValue("description", content);
					}}
				/>
			</div>
			{/* <button type='submit'>Submit</button> */}
		</form>
	);
}

const formCreateTask = withFormik({
	//Kích hoạt dữ liệu mặc định: Bật enableReinitialize = true. Lấy dữ liệu từ state của redux về dưới dạng mapStateToProps. Gán vào các giá trị value của formik
	enableReinitialize: true,
	mapPropsToValues: (props) => {
		const { arrProject, arrTaskTypes, arrPriority, arrStatus } = props;

		// if (arrProject.length > 0) {
		// 	props.dispatch({
		// 		type: GET_USER_BY_PROJECT_ID_SAGA,
		// 		projectId: arrProject[0]?.id,
		// 	});
		// }

		return {
			taskName: "",
			description: "",
			statusId: arrStatus[0]?.statusId,
			originalEstimate: 0,
			timeTrackingSpent: 0,
			timeTrackingRemaining: 0,
			projectId: arrProject[0]?.id,
			typeId: arrTaskTypes[0]?.id,
			priority: arrPriority[0]?.priorityId,
			listUserAsign: [],
		};
	},
	// validationSchema: Yup.object().shape({}),
	handleSubmit: (value, { props, setSubmitting }) => {
		props.dispatch({
			type: "CREATE_TASK_SAGA",
			taskObject: value,
		});
		console.log(value);
	},
	displayName: "createTaskForm",
})(FormCreateTask);

const mapStateToProps = (state) => {
	return {
		arrProject: state.ProjectListCyberbugsReducer.arrProject,
		arrTaskTypes: state.TaskTypeReducer.arrTaskTypes,
		arrPriority: state.PriorityReducer.arrPriority,
		arrStatus: state.StatusReducer.arrStatus,
	};
};

export default connect(mapStateToProps)(formCreateTask);
