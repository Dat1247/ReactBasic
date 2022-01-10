import React from "react";

export default function DemoFlex() {
	return (
		<div className='w-screen h-screen '>
			<div className='flex w-full h-1/2  justify-around items-center'>
				<div className='w-10 h-10 bg-red-400 shadow-2xl'></div>
				<div className='w-10 h-10 bg-gray-400'></div>
				<div className='w-10 h-10 bg-green-400'></div>
			</div>
		</div>
	);
}
