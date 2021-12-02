import React, { useState, useMemo } from "react";
import ChildUseMemo from "./ChildUseMemo";

export default function DemoHookUseMemo(props) {
	let [like, setLike] = useState(0);
	// let cart = [
	// 	{ id: 1, name: "iphone", price: 1000 },
	// 	{ id: 2, name: "android", price: 2000 },
	// 	{ id: 3, name: "lg phone", price: 3000 },
	// ];
	const renderCart = () => {
		let cart = [
			{ id: 1, name: "iphone", price: 1000 },
			{ id: 2, name: "android", price: 2000 },
			{ id: 3, name: "lg phone", price: 3000 },
		];
		return cart;
	};
	// let cartMemo = useMemo(() => cart, []);
	let cartMemo = useMemo(renderCart, []);
	return (
		<div className='m-5'>
			Like: {like}
			<br />
			<button
				className='btn btn-danger'
				onClick={() => {
					setLike(like + 1);
				}}>
				Like
			</button>
			<br />
			<br />
			<ChildUseMemo cart={cartMemo} />
		</div>
	);
}
