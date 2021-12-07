import React, { useRef, useState } from "react";
import {
	useSpring,
	useTransition,
	useChain,
	animated,
	useSpringRef,
} from "react-spring";

export default function Ex6UseChain(props) {
	let [arrItem, setArrayItem] = useState([
		{ id: 1, title: "FrontEndOnline", content: "cyberlearn" },
		{ id: 2, title: "FrontEndOffline", content: "cybersoft" },
		{ id: 3, title: "FrontEndTuXa", content: "cybersoft" },
	]);

	// Tạo 1 useSpring animation
	let springRef = useSpringRef();
	const propsAnim = useSpring({
		ref: springRef,
		opacity: 1,
		width: "100%",
		height: "100%",
		from: { opacity: 0, width: "0%", height: "0%" },
		config: { duration: 500 },
	});

	// Tạo 1 useTransition animation
	let transitionRef = useSpringRef();
	const transitions = useTransition(arrItem, {
		ref: transitionRef,
		keys: (item) => item.id,
		from: { transform: "translate3d(0,-40px,0)" },
		enter: {
			transform: "translate3d(0,0,0)",
			opacity: 1,
			width: "100%",
			height: "100%",
		},
		leave: {
			transform: "translate3d(0,-40px,0)",
			opacity: 0,
			width: "0%",
			height: "0%",
		},
	});

	// Kết hợp cả 2 animation = useChain thông qua 2 thuộc tính ref của cả 2
	useChain([springRef, transitionRef]);

	let renderItem = () => {
		return transitions((props, item, key) => {
			return (
				<animated.div
					style={props}
					key={key}
					className='bg-dark text-white p-3 mt-2'>
					<div className='text-right'>
						<button
							className='btn btn-danger'
							onClick={() => {
								setArrayItem([
									...arrItem.filter((current) => current.id !== item.id),
								]);
							}}>
							X
						</button>
					</div>
					<h1>{item.title}</h1>
					<p>{item.content}</p>
				</animated.div>
			);
		});
	};

	return (
		<div>
			<animated.div style={propsAnim}>{renderItem()}</animated.div>
		</div>
	);
}
