import React from "react";
import { useSpring, animated } from "react-spring";

export default function Ex2UseSpring(props) {
	let { color, ...propsUseSpring } = useSpring({
		color: [131, 111, 255],
		from: { color: [0, 100, 0] },
		config: { duration: 2000, delay: 0 },
	});

	//Tăng phông chữ, màu
	let propsAnimation = useSpring({
		from: {
			width: "0%",
			height: "0%",
			fontSize: "10px",
			color: "red",
		},
		to: async (next, cancel) => {
			await next({
				width: "100%",
				height: "100%",
				fontSize: "50px",
				color: "green",
			});
			await next({
				width: "50%",
				height: "50%",
				fontSize: "10px",
				color: "rgb(131,111,255)",
			});
			await next({
				width: "100%",
				height: "100%",
				fontSize: "50px",
				color: "green",
			});
		},
		config: { duration: 1000 },
	});

	return (
		<div>
			<animated.div
				style={{
					color: color.interpolate((r, g, b) => {
						return `rgb(${r}, ${g}, ${b})`;
					}),
				}}>
				hello cybersoft
			</animated.div>
			<animated.div style={propsAnimation} className='bg-dark'>
				<h1>hello Cyberlearn</h1>
				{/* <p>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem,
					voluptas.
				</p> */}
			</animated.div>
		</div>
	);
}
