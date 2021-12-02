import React, { useState, useCallback } from "react";
import ChildUseCallback from "./ChildUseCallback";

export default function DemoHookUseCallback(props) {
	let [like, setLike] = useState(1);

	const renderModify = () => {
		return `Bạn đã thả ${like} like!`;
	};

	let callbackRenderModify = useCallback(renderModify, [like]);

	return (
		<div>
			<div className='m-5'>
				Like: {like}
				<br />
				<span
					style={{ cursor: "pointer", color: "red", fontSize: 20 }}
					onClick={() => {
						setLike(like + 1);
					}}>
					like
				</span>
				<br />
				<br />
				<ChildUseCallback renderModify={callbackRenderModify} />
			</div>
		</div>
	);
}
