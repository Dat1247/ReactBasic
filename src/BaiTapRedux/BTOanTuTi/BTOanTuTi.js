import React, { Component } from "react";
import "./BTOanTuTi.css";
import Computer from "./Computer";
import Player from "./Player";
import ThongTinTroChoi from "./ThongTinTroChoi";
import { connect } from "react-redux";

class BTOanTuTi extends Component {
	render() {
		return (
			<div className='game'>
				<div className='row text-center'>
					<div className='col-4'>
						<Player />
					</div>
					<div className='col-4'>
						<ThongTinTroChoi />
						<button
							className='btn btn-success mt-4 p-2'
							onClick={() => {
								this.props.playGame();
							}}>
							PLAY GAME
						</button>
					</div>
					<div className='col-4'>
						<Computer />
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		playGame: () => {
			let count = 0;
			let randomComputerItem = setInterval(() => {
				dispatch({
					type: "RAN_DOM",
				});
				count++;
				if (count >= 10) {
					clearInterval(randomComputerItem);
					dispatch({
						type: "END_GAME",
					});
				}
			}, 100);
		},
	};
};

export default connect(null, mapDispatchToProps)(BTOanTuTi);
