import React from "react";
import { useDispatch } from "react-redux";
import { GET_TASK_DETAIL_SAGA } from "../../../redux/constants/CyberBugs/CyberBugsConstants";

export default function CotentMain(props) {
	const dispatch = useDispatch();
	const { projectDetail } = props;

	const renderCardTaskList = () => {
		return projectDetail.lstTask?.map((item, index) => {
			return (
				<div
					className='card'
					style={{ width: "17rem", height: "auto" }}
					key={index}>
					<div className='card-header'>{item.statusName}</div>
					<ul className='list-group list-group-flush'>
						{item.lstTaskDeTail?.map((task, index) => {
							return (
								<li
									key={index}
									className='list-group-item mb-2'
									data-toggle='modal'
									data-target='#infoModal'
									style={{ cursor: "pointer" }}
									onClick={() => {
										dispatch({
											type: GET_TASK_DETAIL_SAGA,
											taskId: task.taskId,
										});
									}}>
									<p className='font-weight-bold'>{task.taskName}</p>
									<div className='block' style={{ display: "flex" }}>
										<div className='block-left'>
											<p
												style={{
													fontWeight: "bold",
													color:
														task.priorityTask.priority === "High"
															? "green"
															: task.priorityTask.priority === "Medium"
															? "yellow"
															: task.priorityTask.priority === "Low"
															? "pink"
															: "red",
												}}>
												{task.priorityTask.priority}
											</p>
										</div>
										<div className='block-right'>
											<div className='avatar-group' style={{ display: "flex" }}>
												{task.assigness?.map((item, index) => {
													return (
														<div className='avatar' key={index}>
															<img src={item.avatar} alt={item.name} />
														</div>
													);
												})}
											</div>
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			);
		});
	};

	return (
		<div className='content' style={{ display: "flex" }}>
			{renderCardTaskList()}
		</div>
	);
}
