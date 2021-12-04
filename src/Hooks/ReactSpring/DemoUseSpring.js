import React from "react";
import { useSpring, animated } from "react-spring";

export default function DemoUseSpring(props) {
	const propsSpring = useSpring({
		opacity: 1,
		color: "red",
		from: { opacity: 0, color: "green" },
		config: { duration: 1000 },
	});

	const propsNumber = useSpring({
		num: 100,
		color: "red",
		from: { num: 10, color: "black" },
		config: { duration: 3000 },
	});

	// const propsScroll = useSpring({
	//     scroll: 100,
	//     from: { scroll: 0}
	// })

	return (
		<div>
			<h1>Change color text</h1>
			<animated.div style={propsSpring}>I will fade in</animated.div>;
			<hr />
			<h1>Change number</h1>
			<animated.h2
				style={{
					color: propsNumber.color,
				}}>
				{propsNumber.num}
			</animated.h2>
			<animated.p style={{ fontSize: propsNumber.num }}>2</animated.p>
		</div>
	);
}
