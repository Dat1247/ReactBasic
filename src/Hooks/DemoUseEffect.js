import React, { useState, useEffect } from "react";
import ChildUseEffect from "./ChildUseEffect";

export default function DemoUseEffect(props) {
	let [number, setNumber] = useState(1);
	let [like, setLike] = useState(1);

	console.log(like);

	// useEffect là hàm chạy sau khi giao diện render - thay cho didMount, didUpdate trong mọi trường hợp
	// useEffect(() => {
	// 	console.log("DidMount");
	// });

	//Cách viết thay thê cho component didMount
	useEffect(() => {
		console.log("didMount");
	}, []);

	//Cách viết thay thế cho component didUpdate
	useEffect(() => {
		console.log("didUpdate");
	}, [number]); //number là giá trị thay đổi sau render

	console.log("render");

	return (
		<div className='m-5'>
			<button
				className='btn btn-danger'
				onClick={() => {
					setLike(like + 1);
				}}>
				Like
			</button>
			<div className='card text-left'>
				<img
					style={{ width: 250, height: 250 }}
					className='card-img-top'
					src='./logo512.png'
					alt='logo'
				/>
				<div className='card-body'>
					<h4 className='card-title'>Title</h4>
					<p className='card-text'>{number}</p>
				</div>
			</div>

			<button
				className='btn btn-primary'
				onClick={() => {
					setNumber(number + 1);
				}}>
				+
			</button>
			{like === 1 ? <ChildUseEffect /> : ""}
		</div>
	);
}
