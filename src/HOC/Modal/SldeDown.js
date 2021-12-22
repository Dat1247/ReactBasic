import React from "react";
import { useSpring, animated } from "react-spring";

export default function SldeDown(Component) {
	const propsSpring = useSpring({
		to: {
			marginTop: "0px",
		},
		from: {
			marginTop: "-100px",
		},
		config: {
			duration: 1000,
		},
	});
	return (
		<animated.div style={propsSpring}>
			<Component />
		</animated.div>
	);
}
