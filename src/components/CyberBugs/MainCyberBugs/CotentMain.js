import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
	GET_TASK_DETAIL_SAGA,
	UPDATE_STATUS_TASK_SAGA,
} from "../../../redux/constants/CyberBugs/CyberBugsConstants";

export default function CotentMain(props) {
	const dispatch = useDispatch();
	const { projectDetail } = props;

	const handleDragEnd = (result) => {
		console.log(result);
		let { destination, source } = result;
		let { projectId, taskId } = JSON.parse(result.draggableId);
		console.log(projectId, taskId);

		if (!destination) {
			return;
		}

		if (
			source.index === destination.index &&
			source.droppableId === destination.droppableId
		) {
			return;
		}

		//Gọi api cập nhật lại status
		dispatch({
			type: UPDATE_STATUS_TASK_SAGA,
			taskStatusUpdate: {
				taskId: taskId,
				statusId: destination.droppableId,
				projectId: projectId,
			},
		});
	};

	const renderCardTaskList = () => {
		return (
			<DragDropContext onDragEnd={handleDragEnd}>
				{projectDetail.lstTask?.map((item, index) => {
					return (
						<Droppable droppableId={item.statusId}>
							{(provided) => {
								return (
									<div
										className='card'
										style={{ width: "17rem", height: "auto" }}>
										<div className='card-header'>{item.statusName}</div>
										<div
											key={index}
											ref={provided.innerRef}
											{...provided.droppableProps}
											className='list-group list-group-flush'
											style={{ height: "100%" }}>
											{item.lstTaskDeTail?.map((task, index) => {
												return (
													<Draggable
														key={task.taskId.toString()}
														index={index}
														draggableId={JSON.stringify({
															projectId: task.projectId,
															taskId: task.taskId,
														})}>
														{(provided) => {
															return (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																	key={index}
																	className='list-group-item mb-2'
																	data-toggle='modal'
																	data-target='#infoModal'
																	onClick={() => {
																		dispatch({
																			type: GET_TASK_DETAIL_SAGA,
																			taskId: task.taskId,
																		});
																	}}>
																	<p className='font-weight-bold'>
																		{task.taskName}
																	</p>
																	<div
																		className='block'
																		style={{ display: "flex" }}>
																		<div className='block-left'>
																			<p
																				style={{
																					fontWeight: "bold",
																					color:
																						task.priorityTask.priority ===
																						"High"
																							? "green"
																							: task.priorityTask.priority ===
																							  "Medium"
																							? "yellow"
																							: task.priorityTask.priority ===
																							  "Low"
																							? "pink"
																							: "red",
																				}}>
																				{task.priorityTask.priority}
																			</p>
																		</div>
																		<div className='block-right'>
																			<div
																				className='avatar-group'
																				style={{ display: "flex" }}>
																				{task.assigness?.map((item, index) => {
																					return (
																						<div className='avatar' key={index}>
																							<img
																								src={item.avatar}
																								alt={item.name}
																							/>
																						</div>
																					);
																				})}
																			</div>
																		</div>
																	</div>
																</div>
															);
														}}
													</Draggable>
												);
											})}
											{provided.placeholder}
										</div>
									</div>
								);
							}}
						</Droppable>
					);
				})}
			</DragDropContext>
		);
	};

	return (
		<div className='content' style={{ display: "flex" }}>
			{renderCardTaskList()}
		</div>
	);
}
