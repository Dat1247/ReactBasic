import React from "react";
import Card from "./Card";

export default function BaiTapLayout() {
	return (
		<div className='container'>
			<h1 className='text-center text-green-400 text-3xl'>
				Welcome to the cybersoft frontend with tailwindCSS
			</h1>
			<div className='grid grid-cols-3 gap-4 my-3'>
				<div className='text-center'>
					<Card />
				</div>
				<div className='text-center'>
					<Card />
				</div>
				<div className='text-center'>
					<Card />
				</div>
			</div>
		</div>
	);
}
