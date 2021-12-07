import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function DiemCuoc(props) {
	const tongDiem = useSelector((state) => state.BTGameBauCuaReducer.tongDiem);
	const dispatch = useDispatch();
	return (
		<div>
			<h3 className='text-center display-4 mt-0' style={{ color: "#58fa58" }}>
				BẦU CUA CYBERLEARN
			</h3>

			<div className='text-center mt-4'>
				<span
					style={{ fontSize: "20px", borderRadius: "5px" }}
					className='p-3 text-white bg-danger'>
					TIỀN THƯỞNG:
					<span className='text-warning'> {tongDiem.toLocaleString()}$</span>
				</span>
			</div>
			<div className='text-center mt-4'>
				<button
					onClick={() => {
						dispatch({ type: "CHOI_LAI" });
					}}
					style={{
						fontSize: "18px",
						borderRadius: "5px",
						border: "none",
					}}
					className='p-3 text-white bg-success'>
					CHƠI LẠI
				</button>
			</div>
		</div>
	);
}
