import React, { Fragment, useEffect } from "react";
import { animated, useSpring, useSpringRef } from "react-spring";

export default function XucXac(props) {
	const { hinhAnh, ma } = props.xucXac;
	const springRef = useSpringRef();
	const [propsDice, apiDice] = useSpring(() => ({
		to: {
			xyz: [1800, 1800, 1800],
		},
		from: {
			xyz: [0, 0, 0],
		},
		config: {
			duration: 1000,
		},
		ref: springRef,
	}));

	apiDice.start({ xyz: [1800, 1800, 1800] });
	useEffect(() => {
		// apiDice.start({ xyz: [1800, 1800, 1800] });
		console.log(springRef.current);
	}, [props]);

	return (
		<Fragment>
			<div className='scene ml-5'>
				<animated.div
					className='cube'
					style={{
						transform: propsDice.xyz.to(
							(x, y, z) =>
								`translateZ(-25px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`
						),
					}}>
					<div className='cube__face front'>
						<img style={{ width: "100%" }} src={hinhAnh} alt={ma} />
					</div>
					<div className='cube__face back'>
						<img
							style={{ width: "100%" }}
							src='./img/GameBauCua/bau.png'
							alt={ma}
						/>
					</div>
					<div className='cube__face left'>
						<img
							style={{ width: "100%" }}
							src='./img/GameBauCua/ga.png'
							alt={ma}
						/>
					</div>
					<div className='cube__face right'>
						<img
							style={{ width: "100%" }}
							src='./img/GameBauCua/ca.png'
							alt={ma}
						/>
					</div>
					<div className='cube__face top'>
						<img
							style={{ width: "100%" }}
							src='./img/GameBauCua/tom.png'
							alt={ma}
						/>
					</div>
					<div className='cube__face bottom'>
						<img
							style={{ width: "100%" }}
							src='./img/GameBauCua/nai.png'
							alt={ma}
						/>
					</div>
				</animated.div>
			</div>
		</Fragment>
	);
}
