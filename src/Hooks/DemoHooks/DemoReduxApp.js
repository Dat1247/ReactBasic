import React, { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { addComment } from "../redux/actions/FakebookAction";

export default function DemoReduxApp(props) {
	// useSelector thay thế cho mapStateToPops
	let comments = useSelector((state) => state.FakebookReducer.comments);

	//useDispatch thay thế cho mapDispatchToProps
	let dispatch = useDispatch();

	//Lấy thông tin người dùng nhập vào
	let [user, setUser] = useState({
		name: "",
		content: "",
		avatar: "",
	});

	const handleChange = (e) => {
		let { value, name } = e.target;
		setUser({
			...user,
			[name]: value,
		});
	};

	const handleComment = (e) => {
		e.preventDefault();

		let userComment = {
			...user,
			avatar: `https://i.pravatar.cc/150?u=${user.name}`,
		};

		// let action = {
		// 	type: "add_comment",
		// 	userComment: userComment,
		// };
		dispatch(addComment(userComment));
	};

	return (
		<div className='container'>
			<h3>Fakebook App!</h3>
			<div className='card text-left'>
				<div className='card-heaader p-3'>
					{comments.map((comment, index) => {
						return (
							<div className='row d-flex align-items-center mb-2' key={index}>
								<div className='col-1'>
									<img
										src={comment.avatar}
										alt={comment.name}
										style={{ width: 60, height: 60 }}
									/>
								</div>
								<div className='col-11'>
									<h6 className='text-danger'>{comment.name}</h6>
									<p>{comment.content}</p>
								</div>
							</div>
						);
					})}
				</div>

				<form className='card-body' onSubmit={handleComment}>
					<div className='form-group'>
						<h4 className='card-title'>Name</h4>
						<input
							type='text'
							className='form-control'
							name='name'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<h4 className='card-text'>Content</h4>
						<input
							type='text'
							className='form-control'
							name='content'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<button className='btn btn-success'>Comment</button>
					</div>
				</form>
			</div>
		</div>
	);
}
