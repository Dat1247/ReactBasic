import React, { useState, useEffect, useRef } from "react";
import {
	Table,
	Button,
	Space,
	Tag,
	Popconfirm,
	Avatar,
	Popover,
	AutoComplete,
} from "antd";
import { EditOutlined, DeleteOutlined, CloseOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
	DELETE_PROJECT_SAGA,
	EDIT_PROJECT,
	GET_LIST_PROJECT_SAGA,
} from "../../../redux/constants/CyberBugs/CyberBugsConstants";
import {
	ADD_USER_PROJECT_API,
	GET_USER_API,
	REMOVE_USER_PROJECT_API,
} from "../../../redux/constants/CyberBugs/UserConstants";
import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";
import { NavLink } from "react-router-dom";
import { OPEN_FORM_EDIT_PROJECT } from "../../../redux/constants/CyberBugs/DrawerConstants";

export default function ProjectManagement(props) {
	const projectList = useSelector(
		(state) => state.ProjectListCyberbugsReducer.projectList
	);
	const { userSearch } = useSelector(
		(state) => state.UserLoginCyberBugsReducer
	);

	const dispatch = useDispatch();

	const [state, setState] = useState({
		filteredInfo: null,
		sortedInfo: null,
	});

	const [valueSearch, setValueSearch] = useState("");

	const searchRef = useRef(null);

	useEffect(() => {
		dispatch({
			type: GET_LIST_PROJECT_SAGA,
		});
	}, []);

	const handleChange = (pagination, filters, sorter) => {
		// console.log("Various parameters", pagination, filters, sorter);
		setState({
			filteredInfo: filters,
			sortedInfo: sorter,
		});
	};
	const clearFilters = () => {
		setState({ filteredInfo: null });
	};
	const clearAll = () => {
		setState({
			filteredInfo: null,
			sortedInfo: null,
		});
	};

	const setAgeSort = () => {
		setState({
			sortedInfo: {
				order: "descend",
				columnKey: "age",
			},
		});
	};
	let { sortedInfo, filteredInfo } = state;
	sortedInfo = sortedInfo || {};
	filteredInfo = filteredInfo || {};
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			// filters: [
			// 	{ text: "Joe", value: "Joe" },
			// 	{ text: "Jim", value: "Jim" },
			// ],
			// filteredValue: filteredInfo.name || null,
			// onFilter: (value, record) => record.name.includes(value),
			// sorter: (a, b) => a.name.length - b.name.length,
			// sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
			// ellipsis: true,
			sorter: (item2, item1) => {
				return item2.id - item1.id;
			},
			sortDirections: ["descend"],
		},
		{
			title: "Project name",
			dataIndex: "projectName",
			key: "projectName",
			// sorter: (a, b) => a.age - b.age,
			// sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
			// ellipsis: true,
			render: (text, record, index) => {
				return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
			},
			sorter: (item2, item1) => {
				let projectName1 = item1.projectName.trim().toLowerCase();
				let projectName2 = item2.projectName.trim().toLowerCase();
				if (projectName2 < projectName1) {
					return -1;
				}
				return 1;
			},
			sortDirections: ["ascend", "descend"],
		},
		// {
		// 	title: "Description",
		// 	dataIndex: "description",
		// 	key: "description",
		// 	// filters: [
		// 	// 	{ text: "London", value: "London" },
		// 	// 	{ text: "New York", value: "New York" },
		// 	// ],
		// 	// filteredValue: filteredInfo.address || null,
		// 	// onFilter: (value, record) => record.address.includes(value),
		// 	// sorter: (a, b) => a.address.length - b.address.length,
		// 	// sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order,
		// 	// ellipsis: true,
		// 	render: (text, record, index) => {
		// 		let jsxContent = ReactHtmlParser(text);

		// 		return <div key={index}>{jsxContent}</div>;
		// 	},
		// },
		{
			title: "Category",
			dataIndex: "categoryName",
			key: "categoryName",
			// sorter: (a, b) => a.age - b.age,
			// sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order,
			// ellipsis: true,
			sorter: (item2, item1) => {
				let category1 = item1.categoryName.trim().toLowerCase();
				let category2 = item2.categoryName.trim().toLowerCase();
				if (category2 < category1) {
					return -1;
				}
				return 1;
			},
		},
		{
			title: "creator",
			key: "creator",
			render: (text, record, index) => {
				return <Tag color='green'>{record.creator.name}</Tag>;
			},
			sorter: (item2, item1) => {
				let creator1 = item1.creator.name.trim().toLowerCase();
				let creator2 = item2.creator.name.trim().toLowerCase();
				if (creator2 < creator1) {
					return -1;
				}
				return 1;
			},
		},
		{
			title: "members",
			key: "members",
			render: (text, record, index) => {
				return (
					<div>
						{record.members?.slice(0, 3).map((item, index) => {
							return (
								<Popover
									key={index}
									placement='top'
									title={"member"}
									content={() => {
										return (
											<table className='table'>
												<thead>
													<tr>
														<th>Id</th>
														<th>Avatar</th>
														<th>Name</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{record.members?.map((item, index) => {
														return (
															<tr key={index}>
																<td>{item.userId}</td>
																<td>
																	<img
																		src={item.avatar}
																		width='25'
																		height='25'
																		style={{ borderRadius: "50%" }}
																		alt={item.name}
																	/>
																</td>
																<td>{item.name}</td>
																<td>
																	<Button
																		type='primary'
																		danger
																		shape='circle'
																		icon={<CloseOutlined />}
																		onClick={() => {
																			dispatch({
																				type: REMOVE_USER_PROJECT_API,
																				userProject: {
																					userId: item.userId,
																					projectId: record.id,
																				},
																			});
																		}}
																	/>
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										);
									}}>
									<Avatar src={item.avatar} />
								</Popover>
							);
						})}
						{record.members.length > 3 ? <Avatar>...</Avatar> : ""}
						<Popover
							placement='bottom'
							title={"Add user"}
							content={() => {
								return (
									<AutoComplete
										style={{ width: "100%" }}
										onSearch={(value) => {
											if (searchRef.current) {
												clearTimeout(searchRef.current);
											}
											searchRef.current = setTimeout(() => {
												dispatch({
													type: GET_USER_API,
													keyWord: value,
												});
											}, 300);
										}}
										options={userSearch?.map((item, index) => {
											return {
												label: item.name,
												value: item.userId.toString(),
											};
										})}
										onChange={(text) => {
											setValueSearch(text);
										}}
										value={valueSearch}
										onSelect={(valueSelect, option) => {
											//Set gia tri hop thoai = option.label
											setValueSearch(option.label);

											//Goi api gui ve back-end
											dispatch({
												type: ADD_USER_PROJECT_API,
												userProject: {
													projectId: record.id,
													userId: valueSelect,
												},
											});
										}}
									/>
								);
							}}
							trigger='click'>
							<Button shape='circle'>+</Button>
						</Popover>
					</div>
				);
			},
			sorter: (item2, item1) => {
				let creator1 = item1.creator.name.trim().toLowerCase();
				let creator2 = item2.creator.name.trim().toLowerCase();
				if (creator2 < creator1) {
					return -1;
				}
				return 1;
			},
		},
		{
			title: "Action",
			key: "action",
			render: (text, record, index) => (
				<Space size='middle'>
					<Button
						type='primary'
						onClick={() => {
							const action = {
								type: OPEN_FORM_EDIT_PROJECT,
								title: "Edit Project",
								Component: <FormEditProject />,
							};

							//dispatch lên reducer
							dispatch(action);

							//dispatch dữ liệu dòng hiện tại lên reducer
							const actionEditProject = {
								type: EDIT_PROJECT,
								projectEditModal: record,
							};
							dispatch(actionEditProject);
						}}
						icon={<EditOutlined />}
					/>

					<Popconfirm
						title='Are you sure to delete this project?'
						onConfirm={() => {
							dispatch({ type: DELETE_PROJECT_SAGA, idProject: record.id });
						}}
						// onCancel={cancel}
						okText='Yes'
						cancelText='No'>
						<Button type='primary' danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];
	return (
		<div className='container-fluid mt-5'>
			<h3>Project Management</h3>
			<Space style={{ marginBottom: 16 }}>
				<Button onClick={setAgeSort}>Sort age</Button>
				<Button onClick={clearFilters}>Clear filters</Button>
				<Button onClick={clearAll}>Clear filters and sorters</Button>
			</Space>
			<Table
				columns={columns}
				rowKey={"id"}
				dataSource={projectList}
				onChange={handleChange}
			/>
		</div>
	);
}
