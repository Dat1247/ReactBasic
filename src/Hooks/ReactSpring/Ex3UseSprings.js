import React from "react";
import { useSprings, animated } from "react-spring";

export default function Ex3UseSprings(props) {
	let arrOpacity = [
		{ opacity: 0.1, color: "red", content: "FullStack", num: 100 },
		{ opacity: 0.3, color: "green", content: "BackEnd", num: 110 },
		{ opacity: 0.5, color: "blue", content: "FrontEnd", num: 120 },
		{ opacity: 0.7, color: "violet", content: "CyberLearn", num: 200 },
		{ opacity: 1, color: "orange", content: "CyberSoft", num: 300 },
	];
	let propsAnimationUseSprings = useSprings(
		arrOpacity.length,
		arrOpacity.map((item) => {
			return {
				opacity: item.opacity,
				color: item.color,
				content: item.content,
				num: item.num,
				from: { opacity: 0, color: "black", content: item.content, num: 0 },
				config: { duration: 3000 },
			};
		})
	);

	const renderContent = (propsAni) => {
		let result = [];
		for (let key in propsAni) {
			if (key === "content" || key === "num") {
				result.push(
					<animated.span style={propsAni}>{propsAni[key]}</animated.span>
				);
			}
		}
		return result;
	};
	return (
		<div>
			{propsAnimationUseSprings.map((item, index) => {
				// return (
				// 	<div>
				// 		<animated.span style={item} key={index}>
				// 			{item.content}
				// 		</animated.span>
				// 		-
				// 		<animated.span style={item} key={index}>
				// 			{item.num}
				// 		</animated.span>
				// 	</div>
				// );
				return <div>{renderContent(item)}</div>;
			})}
		</div>
	);
}
