import React, { memo } from "react";

function ChildUseCallback(props) {
	let title = "cyberlearn";
	let object = { id: 1, name: "Quan" };
	console.log("title", title);
	console.log(object);
	console.log("re-render");

	return (
		<div>
			<small>{props.renderModify()}</small>
			<textarea></textarea>
			<br /> <br />
			<button className='btn btn-success'>Gửi</button>
		</div>
	);
}
export default memo(ChildUseCallback);
