import React, { useState, useEffect } from "react";
import { Table, Button, Space, Tag, Divider } from "antd";
import ReactHtmlParser from "react-html-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { GET_LIST_PROJECT_SAGA } from "../../../redux/constants/CyberBugs/CyberBugsConstants";

export default function ProjectManagement(props) {
	const projectList = useSelector(
		(state) => state.ProjectListCyberbugsReducer.projectList
	);

	const dispatch = useDispatch();

	const [state, setState] = useState({
		filteredInfo: null,
		sortedInfo: null,
	});

	useEffect(() => {
		dispatch({
			type: GET_LIST_PROJECT_SAGA,
		});
	}, []);

	const handleChange = (pagination, filters, sorter) => {
		console.log("Various parameters", pagination, filters, sorter);
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
			title: "Action",
			key: "action",
			render: (text, record, index) => (
				<Space size='middle'>
					<Button type='primary' onClick={() => {}}>
						<EditOutlined />
					</Button>
					<Button type='primary' danger>
						<DeleteOutlined />
					</Button>
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
