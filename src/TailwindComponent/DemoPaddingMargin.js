import React from "react";

export default function DemoPadding() {
	return (
		<div className='container'>
			<button className='bg-red-200 mt-4 px-5 py-5' style={{ width: "auto" }}>
				button padding
			</button>
			<br />
			<button className='bg-purple-400 m-5'>button margin</button>
		</div>
	);
}
