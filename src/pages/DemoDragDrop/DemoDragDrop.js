import React, { useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import "./DemoDragDrop.css";

const defaultTaskList = [
	{ id: 1, taskName: "Task 1" },
	{ id: 2, taskName: "Task 2" },
	{ id: 3, taskName: "Task 3" },
	{ id: 4, taskName: "Task 4" },
	{ id: 5, taskName: "Task 5" },
];

export default function DemoDragDrop(props) {
	const [taskList, setTaskList] = useState(defaultTaskList);
	const tagDrag = useRef({});
	const tagDragEnter = useRef({});

	//Khai báo animation
	const [propsSpring, api] = useSpring(() => ({
		from: { bottom: -25 },
		to: { bottom: 0 },
		config: { duration: 250 },
		reset: true,
	}));

	const handleDragStart = (e, task, index) => {
		console.log("task", task);
		console.log("tag", e.target);
		console.log("index", index);

		//Lưu lại giá trị của task đang kéo
		tagDrag.current = task;
	};

	const handleDragOver = (e) => {
		console.log("dragOver", e.target);
	};

	const handleDragEnd = (e) => {
		// console.log("dragEnd", e.target);
		// tagDrag.current = {};
		// setTaskList([...taskList]);
	};

	const handleOnDrop = (e) => {
		console.log("drop", e.target);
	};

	const handleDragEnter = (e, task, index) => {
		// console.log("dragEnter", e.target);

		api.start({ from: { bottom: -25 }, to: { bottom: 0 } });
		//Lưu lại giá trị của task được kéo ngang qua
		tagDragEnter.current = { ...task };

		let taskListUpdate = [...taskList];

		//Lấy ra index của task đang kéo
		let indexDragTag = taskListUpdate.findIndex(
			(ts) => ts.id === tagDrag.current.id
		);

		// Lấy ra index của task bị kéo qua
		let indexDragEnter = taskListUpdate.findIndex((ts) => ts.id === task.id);

		//Gán giá trị của biến tạm = task đang kéo
		let temp = taskListUpdate[indexDragTag];
		//Gán giá trị của task đang kéo = task bị kéo qua
		taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
		//Gán lại giá trị của task bị kéo qua = biến tạm
		taskListUpdate[indexDragEnter] = temp;

		setTaskList(taskListUpdate);
	};

	return (
		<div
			className='container'
			onDragOver={(e) => {
				e.stopPropagation();
				e.preventDefault();
			}}
			onDrop={(e) => {
				tagDrag.current = {};

				setTaskList([...taskList]);
			}}>
			<div className='text-center display-4' onDragOver={handleDragOver}>
				Task list
			</div>
			<div className='row'>
				<div className='col-3'></div>
				<div className='bg-dark p-5 col-6'>
					{taskList.map((task, index) => {
						let cssDragTag = task.id === tagDrag.current.id ? "dragTag" : "";

						if (task.id === tagDragEnter.current.id) {
							return (
								<animated.div
									style={{
										position: "relative",
										bottom: propsSpring.bottom.interpolate(
											(numBottom) => `${numBottom}px`
										),
									}}
									onDragStart={(e) => {
										handleDragStart(e, task, index);
									}}
									onDragEnter={(e) => {
										handleDragEnter(e, task, index);
									}}
									onDragEnd={handleDragEnd}
									draggable='true'
									className={`bg-success text-white m-1 p-3 ${cssDragTag}`}
									key={index}>
									{task.taskName}
								</animated.div>
							);
						}

						return (
							<div
								//Kích hoạt khi người dùng kéo thẻ
								onDragStart={(e) => {
									handleDragStart(e, task, index);
								}}
								//Kích hoạt khi thẻ đang kéo di chuyển trên khu vực thả.
								//onDragOver = onDragEnter; nhưng onDragEnter chỉ bắt sự kiện khi thẻ được kéo, kéo đến khu vực thả hoặc kéo khỏi khu vực thả; còn onDragOver thì sẽ bắt sự kiện liên tục
								// onDragOver={handleDragOver}
								onDragEnter={(e) => {
									handleDragEnter(e, task, index);
								}}
								//Kích hoạt khi người dùng thả thẻ ra
								onDragEnd={handleDragEnd}
								draggable='true'
								className={`bg-success text-white m-1 p-3 ${cssDragTag}`}
								key={index}>
								{task.taskName}
							</div>
						);
					})}
				</div>
				<div
					className='col-3 bg-info'
					draggable='true'
					style={{ height: "500px" }}
					// onDragOver={(e) => {
					// 	e.stopPropagation();
					// 	e.preventDefault();
					// }}
					// onDrop={(e) => {
					// 	handleOnDrop(e);
					// }}
				></div>
			</div>
		</div>
	);
}
