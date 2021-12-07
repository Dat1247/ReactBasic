import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

export default function QuanCuoc(props) {
	const { quanCuoc } = props;
	const [stateIncrease, toggleIncrease] = useState(true);
	const [stateDecrease, toggleDecrease] = useState(true);

	const dispatch = useDispatch();

	const { x } = useSpring({
		from: { x: 0 },
		x: stateIncrease ? 1 : 0,
		config: { duration: 500 },
	});
	const { y } = useSpring({
		from: { y: 0 },
		y: stateDecrease ? 1 : 0,
		config: { duration: 500 },
	});

	return (
		<div className='mt-3'>
			<img
				src={quanCuoc.hinhAnh}
				alt={quanCuoc.ma}
				style={{ width: "200px" }}
			/>
			<div
				className='bg-success mt-2 text-center'
				style={{ borderRadius: "10px", width: 200 }}>
				<animated.button
					className='my-2 btn btn-danger mr-3'
					style={{
						fontSize: "20px",

						scale: x.to({
							range: [0, 0.25, 0.5, 0.75, 1],
							output: [1, 1.15, 1.25, 1.15, 1],
						}),
					}}
					onClick={() => {
						toggleIncrease(!stateIncrease);
						// console.log(set);
						// api.start({ scale: 1 });
						// api.set({ scale: 1.25 });

						dispatch({
							type: "DAT_CUOC_BAU_CUA",
							quanCuoc,
							tangGiam: true,
						});
					}}>
					+
				</animated.button>
				<span style={{ color: "yellow", fontSize: "20px" }}>
					{quanCuoc.diemCuoc}
				</span>
				<animated.button
					className='my-2 btn btn-danger ml-3'
					style={{
						fontSize: "20px",
						scale: y.to({
							range: [0, 0.25, 0.5, 0.75, 1],
							output: [1, 1.15, 1.25, 1.15, 1],
						}),
					}}
					onClick={() => {
						toggleDecrease(!stateDecrease);

						dispatch({
							type: "DAT_CUOC_BAU_CUA",
							quanCuoc,
							tangGiam: false,
						});
					}}>
					-
				</animated.button>
			</div>
		</div>
	);
}
