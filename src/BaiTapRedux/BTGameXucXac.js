import React, { Component } from "react";
import "./BTGameXucXac.css";
import ThongTinTroChoi from "./ThongTinTroChoi";
import XucXac from "./XucXac";

import { connect } from "react-redux";

class BTGameXucXac extends Component {
	render() {
		return (
			<div
				className='game'
				style={{ backgroundImage: 'url("./game_xuc_xac/bgGame.png")' }}>
				<div className='title-game mt-5 text-center display-4'>
					BÀI TẬP GAME XÚC XẮC
				</div>
				<div className='row text-center mt-2'>
					<div className='col-5'>
						<button
							className='btnGame'
							onClick={() => {
								this.props.datCuoc(true);
							}}>
							TÀI
						</button>
					</div>
					<div className='col-2'>
						<XucXac />
					</div>
					<div className='col-5'>
						<button
							className='btnGame'
							onClick={() => {
								this.props.datCuoc(false);
							}}>
							XỈU
						</button>
					</div>
				</div>
				<div className='thongTinTroChoi text-center'>
					<ThongTinTroChoi />
					<button
						className='btn btn-success p-2 mt-5 display-4'
						onClick={() => {
							this.props.playGame();
						}}>
						PLAY GAME
					</button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		datCuoc: (taiXiu) => {
			dispatch({
				type: "DAT_CUOC",
				taiXiu,
			});
		},
		playGame: () => {
			let action = {
				type: "PLAY_GAME",
			};
			dispatch(action);
		},
	};
};

export default connect(null, mapDispatchToProps)(BTGameXucXac);
