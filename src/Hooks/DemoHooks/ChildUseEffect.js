import React, { useEffect, useState } from "react";

export default function ChildUseEffect() {
	let [input, setInput] = useState(1);
	console.log("render child");

	useEffect(() => {
		// Viết cho didUpdate
		console.log("didUpdate child");
		return () => {
			console.log("willUnmount");
		};
	}, [input]);

	return (
		<div>
			<textarea></textarea>
			<br />
			<button className='btn btn-success'>Gửi</button>
		</div>
	);
}
