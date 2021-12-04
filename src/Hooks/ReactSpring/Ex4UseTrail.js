import React, { useState } from "react";
import { useTrail, animated } from "react-spring";

const items = [
	{ title: "Front-end-Online", content: "CyberSoft" },
	{ title: "Front-end-Offline", content: "CyberSoft" },
	{ title: "Front-end-Tu-Xa", content: "CyberSoft" },
];

export default function Ex4UseTrail(props) {
	let [status, setStatus] = useState(true);

	const [propsUseTrail, set, stop] = useTrail(items.length, () => {
		return {
			opacity: status ? 1 : 0,
			x: status ? 0 : 20,
			height: status ? 80 : 0,
			color: "red",
			from: { opacity: 0, x: 20, height: 0, color: "green" },
			config: { duration: 1000 },
		};
	});

	return (
		<div>
			<button
				onClick={() => {
					setStatus(!status);
				}}
				style={{ zIndex: 1000 }}>
				Set Status
			</button>
			<button
				onClick={() => {
					set({ color: "pink" });
				}}
				style={{ zIndex: 1000 }}>
				Set
			</button>

			{propsUseTrail.map((propsUseSpring, index) => {
				return (
					<animated.h1 key={index} style={propsUseSpring}>
						{items[index].title}
					</animated.h1>
				);
			})}
		</div>
	);
}
