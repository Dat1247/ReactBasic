import React from "react";
import "./CustomCSS.css";

export default function CustomCSS() {
	return (
		<div className='container mt-1'>
			<article className='bg-gray-500 p-5 shadow-lg'>
				<p className='text-4xl text-white'>Responsive </p>

				<p className='content hover:text-green-200'>
					Every utility class in Tailwind can be applied conditionally at
					different breakpoints, which makes it a piece of cake to build complex
					responsive interfaces without ever leaving your HTML
				</p>
			</article>
		</div>
	);
}
