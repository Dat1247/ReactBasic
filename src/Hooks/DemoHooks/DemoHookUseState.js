import React, { useState } from "react";

export default function DemoHookUseState(props) {
	//this.state = [] === (1)
	//this.setState(newState) === (2)

	//tuple
	let [state, setState] = useState({ like: 0 });

	const handleLike = () => {
		setState({
			like: state.like + 1,
		});
	};

	return (
		<div className='container m-5'>
			<div className='card text-left'>
				<img
					style={{ width: 250, height: 250 }}
					className='card-img-top'
					src='https://picsum.photos/200/200'
					alt='hinh-1'
				/>
				<div className='card-body'>
					<h4 className='card-title'>Picture</h4>
					<p style={{ color: "red" }}>{state.like} like</p>
				</div>
			</div>
			<button className='btn btn-danger' onClick={handleLike}>
				Like
			</button>
		</div>
	);
}
