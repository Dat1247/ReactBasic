import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { useEffect } from "react";
import {
	CHANGE_ASSIGNEES,
	CHANGE_TASK_MODAL,
	GET_ALL_PRIORITY_SAGA,
	GET_ALL_STATUS_SAGA,
	GET_ALL_TASK_TYPE_SAGA,
	GET_PROJECT_DETAIL_SAGA,
	HANDLE_CHANGE_POST_API_SAGA,
	REMOVE_USER_ASSIGN,
	UPDATE_STATUS_TASK_SAGA,
} from "../../../redux/constants/CyberBugs/CyberBugsConstants";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";

const { Option } = Select;

export default function ModalCyberbugs(props) {
	const { taskDetailModal } = useSelector((state) => state.TaskReducer);
	const { arrStatus } = useSelector((state) => state.StatusReducer);
	const { arrPriority } = useSelector((state) => state.PriorityReducer);
	const { arrTaskTypes } = useSelector((state) => state.TaskTypeReducer);
	const { projectDetail } = useSelector((state) => state.ProjectReducer);

	const [visibleEditor, setVisibleEditor] = useState(false);
	const [historyContent, setHistoryContent] = useState(
		taskDetailModal.description
	);
	const [content, setContent] = useState(taskDetailModal.description);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: GET_ALL_STATUS_SAGA,
		});
		dispatch({
			type: GET_ALL_PRIORITY_SAGA,
		});
		dispatch({
			type: GET_ALL_TASK_TYPE_SAGA,
		});
		// dispatch({
		// 	type: GET_PROJECT_DETAIL_SAGA,
		// 	projectId: taskDetailModal.projectId,
		// });
	}, []);

	const renderDescription = () => {
		const jsxDescription = ReactHtmlParser(taskDetailModal.description);
		return (
			<div>
				{visibleEditor ? (
					<div>
						<Editor
							name='description'
							initialValue={taskDetailModal.description}
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
								setContent(content);
							}}
						/>
						<div className='btnGroup'>
							<button
								className='btn btn-success m-2'
								onClick={() => {
									// dispatch({
									// 	type: CHANGE_TASK_MODAL,
									// 	name: "description",
									// 	value: content,
									// });
									dispatch({
										type: HANDLE_CHANGE_POST_API_SAGA,
										actionType: CHANGE_TASK_MODAL,
										name: "description",
										value: content,
									});
									setHistoryContent(content);
									setVisibleEditor(false);
								}}>
								Save
							</button>
							<button
								className='btn btn-info'
								onClick={() => {
									// dispatch({
									// 	type: CHANGE_TASK_MODAL,
									// 	name: "description",
									// 	value: historyContent,
									// });
									dispatch({
										type: HANDLE_CHANGE_POST_API_SAGA,
										actionType: CHANGE_TASK_MODAL,
										name: "description",
										value: historyContent,
									});
									setVisibleEditor(false);
								}}>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<div
						onClick={() => {
							setVisibleEditor(!visibleEditor);
						}}>
						{jsxDescription}
					</div>
				)}
			</div>
		);
	};

	const renderTimeTracking = () => {
		const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
		const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
		const percent = Math.round((Number(timeTrackingSpent) * 100) / max);
		return (
			<div>
				<div style={{ display: "flex" }}>
					<i className='fa fa-clock' />
					<div style={{ width: "100%" }}>
						<div className='progress'>
							<div
								className='progress-bar'
								role='progressbar'
								style={{ width: `${percent}%` }}
								aria-valuenow={Number(timeTrackingSpent)}
								aria-valuemin={0}
								aria-valuemax={max}
							/>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}>
							<p className='logged'>{Number(timeTrackingSpent)}h logged</p>
							<p className='estimate-time'>
								{Number(timeTrackingRemaining)}h remaining
							</p>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-6'>
						<input
							name='timeTrackingSpent'
							className='form-control'
							onChange={handleChange}
						/>
					</div>
					<div className='col-6'>
						<input
							name='timeTrackingRemaining'
							className='form-control'
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
		);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		dispatch({
			type: HANDLE_CHANGE_POST_API_SAGA,
			actionType: CHANGE_TASK_MODAL,
			name,
			value,
		});
	};

	return (
		<div
			className='modal fade'
			id='infoModal'
			tabIndex={-1}
			role='dialog'
			aria-labelledby='infoModal'
			aria-hidden='true'>
			<div className='modal-dialog modal-info'>
				<div className='modal-content'>
					<div className='modal-header'>
						<div className='task-title'>
							<i className='fa fa-bookmark' />
							{/* <span>TASK-217871</span> */}
							<select
								name='typeId'
								className='form-control'
								value={taskDetailModal.typeId}
								onChange={handleChange}>
								{arrTaskTypes?.map((item, index) => {
									return (
										<option value={item.id} key={index}>
											{item.taskType}
										</option>
									);
								})}
							</select>
						</div>
						<div style={{ display: "flex" }} className='task-click'>
							<div>
								<i className='fab fa-telegram-plane' />
								<span style={{ paddingRight: 20 }}>Give feedback</span>
							</div>
							<div>
								<i className='fa fa-link' />
								<span style={{ paddingRight: 20 }}>Copy link</span>
							</div>
							<i className='fa fa-trash-alt' style={{ cursor: "pointer" }} />
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'>
								<span aria-hidden='true'>×</span>
							</button>
						</div>
					</div>
					<div className='modal-body'>
						<div className='container-fluid'>
							<div className='row'>
								<div className='col-8'>
									<p className='issue'>{taskDetailModal.taskName}</p>
									<div className='description'>
										<p>Description</p>
										{renderDescription()}
									</div>
									<div className='comment'>
										<h6>Comment</h6>
										<div className='block-comment' style={{ display: "flex" }}>
											<div className='avatar'>
												<img
													src={
														require("../../../assets/img/download (1).jfif")
															.default
													}
													alt='1'
												/>
											</div>
											<div className='input-comment'>
												<input type='text' placeholder='Add a comment ...' />
												<p>
													<span style={{ fontWeight: 500, color: "gray" }}>
														Protip:
													</span>
													<span>
														press
														<span
															style={{
																fontWeight: "bold",
																background: "#ecedf0",
																color: "#b4bac6",
															}}>
															M
														</span>
														to comment
													</span>
												</p>
											</div>
										</div>
										<div className='lastest-comment'>
											<div className='comment-item'>
												<div
													className='display-comment'
													style={{ display: "flex" }}>
													<div className='avatar'>
														<img
															src={
																require("../../../assets/img/download (1).jfif")
																	.default
															}
															alt='1'
														/>
													</div>
													<div>
														<p style={{ marginBottom: 5 }}>
															Lord Gaben <span>a month ago</span>
														</p>
														<p style={{ marginBottom: 5 }}>
															Lorem ipsum dolor sit amet, consectetur
															adipisicing elit. Repellendus tempora ex
															voluptatum saepe ab officiis alias totam ad
															accusamus molestiae?
														</p>
														<div>
															<span style={{ color: "#929398" }}>Edit</span>•
															<span style={{ color: "#929398" }}>Delete</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='col-4'>
									<div className='status'>
										<h6>STATUS</h6>
										<select
											name='statusId'
											className='custom-select'
											value={taskDetailModal.statusId}
											onChange={(e) => {
												// const action = {
												// 	type: UPDATE_STATUS_TASK_SAGA,
												// 	taskStatusUpdate: {
												// 		taskId: taskDetailModal.taskId,
												// 		statusId: e.target.value,
												// 		projectId: taskDetailModal.projectId,
												// 	},
												// };
												// dispatch(action);

												handleChange(e);
											}}>
											{arrStatus?.map((item, index) => {
												return (
													<option value={item.statusId} key={index}>
														{item.statusName}
													</option>
												);
											})}
										</select>
									</div>
									<div className='assignees'>
										<h6>ASSIGNEES</h6>
										<div className='row'>
											{taskDetailModal.assigness?.map((item, index) => {
												return (
													<div className='col-6 my-2' key={index}>
														<div
															style={{
																display: "flex",
																alignItems: "center",
															}}
															className='item'>
															<div className='avatar mr-3'>
																<img src={item.avatar} alt={item.name} />
															</div>
															<p className='name'>
																{item.name}
																<i
																	className='fa fa-times'
																	style={{ marginLeft: 5, cursor: "pointer" }}
																	onClick={() => {
																		// dispatch({
																		// 	type: REMOVE_USER_ASSIGN,
																		// 	userId: item.id,
																		// });
																		dispatch({
																			type: HANDLE_CHANGE_POST_API_SAGA,
																			actionType: REMOVE_USER_ASSIGN,
																			userId: item.id,
																		});
																	}}
																/>
															</p>
														</div>
													</div>
												);
											})}

											<div className='col-6 my-2'>
												<Select
													options={projectDetail.members
														?.filter((mem) => {
															let index = taskDetailModal.assigness?.findIndex(
																(us) => us.id === mem.userId
															);
															if (index !== -1) {
																return false;
															}
															return true;
														})
														.map((mem, index) => {
															return { value: mem.userId, label: mem.name };
														})}
													optionFilterProp='label'
													style={{ width: "100%" }}
													name='lstUser'
													value='+ Add more'
													className='form-control'
													onSelect={(value) => {
														let userSelect = projectDetail.members?.find(
															(mem) => mem.userId == value
														);
														userSelect = {
															...userSelect,
															id: userSelect.userId,
														};

														//dispatch lên reducer
														// dispatch({
														// 	type: CHANGE_ASSIGNEES,
														// 	userSelect,
														// });

														dispatch({
															type: HANDLE_CHANGE_POST_API_SAGA,
															actionType: CHANGE_ASSIGNEES,
															userSelect,
														});
													}}></Select>
												{/* <Select
													showSearch
													style={{ width: 200 }}
													placeholder='Search to Select'
													optionFilterProp='children'
													filterOption={(input, option) =>
														option.children
															.toLowerCase()
															.indexOf(input.toLowerCase()) >= 0
													}
													filterSort={(optionA, optionB) =>
														optionA.children
															.toLowerCase()
															.localeCompare(optionB.children.toLowerCase())
													}>
													<Option value='1'>Not Identified</Option>
													<Option value='2'>Closed</Option>
													<Option value='3'>Communicated</Option>
													<Option value='4'>Identified</Option>
													<Option value='5'>Resolved</Option>
													<Option value='6'>Cancelled</Option>
												</Select> */}
											</div>
										</div>
									</div>
									<div className='priority' style={{ marginBottom: 20 }}>
										<h6>PRIORITY</h6>
										<select
											name='priorityId'
											className='form-control'
											value={taskDetailModal.priorityId}
											onChange={(e) => {
												handleChange(e);
											}}>
											{arrPriority?.map((item, index) => {
												return (
													<option value={item.priorityId} key={index}>
														{item.priority}
													</option>
												);
											})}
										</select>
									</div>
									<div className='estimate'>
										<h6>ORIGINAL ESTIMATE (HOURS)</h6>
										<input
											type='text'
											className='estimate-hours'
											value={taskDetailModal.originalEstimate}
											onChange={(e) => {
												handleChange(e);
											}}
										/>
									</div>
									<div className='time-tracking'>
										<h6>TIME TRACKING</h6>
										{renderTimeTracking()}
									</div>
									<div style={{ color: "#929398" }}>Create at a month ago</div>
									<div style={{ color: "#929398" }}>
										Update at a few seconds ago
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
