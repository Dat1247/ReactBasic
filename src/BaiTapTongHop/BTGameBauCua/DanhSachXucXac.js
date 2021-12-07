import React from "react";
import { useSelector, useDispatch } from "react-redux";
import XucXac from "./XucXac";

export default function DanhSachXucXac(props) {
	const mangXucXac = useSelector(
		(state) => state.BTGameBauCuaReducer.mangXucXac
	);

	const dispatch = useDispatch();

	return (
		<div>
			<div
				className='bg-white'
				style={{ width: 300, height: 300, borderRadius: 150 }}>
				<div className='row'>
					<div
						className='col-12 text-center'
						style={{ marginTop: "0", marginLeft: 75 }}>
						<XucXac xucXac={mangXucXac[0]} />
					</div>
					<div className='col-6 text-right'>
						<XucXac xucXac={mangXucXac[1]} />
					</div>
					<div className='col-6'>
						<XucXac xucXac={mangXucXac[2]} />
					</div>
				</div>
			</div>
			<div style={{ marginLeft: "26%", marginTop: 20 }}>
				<button
					onClick={() => {
						dispatch({ type: "PLAY_GAME_BAU_CUA" });
					}}
					className='btn btn-success p-2'
					style={{ fontSize: 25 }}>
					Xốc
				</button>
			</div>
		</div>
	);
}
