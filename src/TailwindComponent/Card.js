import React from "react";

export default function Card(props) {
	return (
		<div className='card'>
			<div className='card-body bg-gray-400 py-8 rounded-t-lg px-5'>
				<h3 className='text-purple-800 font-bold'>Category</h3>
				<p className='text-black text-2xl my-2'>Cybersoft Frontend Developer</p>
				<p className='text-black text-base font-thin'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
					optio, tempore dolor veritatis cumque ullam perferendis molestias.
					Quaerat, cupiditate illum odio nisi minima nulla? Dolorum, voluptates?
					Ipsa officiis aperiam vitae.
				</p>
			</div>
			<div className='card-footer rounded-b-lg bg-gray-200 p-5  flex justify-between items-center'>
				<p>1 USD</p>
				<button className='bg-purple-500 rounded-lg p-2 text-white hover:text-purple-500 hover:bg-gray-300 transition duration-500'>
					Register
				</button>
			</div>
		</div>
	);
}
