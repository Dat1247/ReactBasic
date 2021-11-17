import React, { Component } from "react";
import { connect } from "react-redux";
class Computer extends Component {
	render() {
		let keyFrame = `@keyframes randomItem${Date.now()}{
            0% {
                top: -25px
            }
            25%{
                top: 100px
            }
            50% {
                top: -25px
            }
            75% {
                top: 100px
            }
            100% {
                top: 0
            }
        }`;
		return (
			<div className='d-flex align-items-center flex-column mt-4'>
				<style>{keyFrame}</style>
				<div className='theThink d-flex align-items-center justify-content-center'>
					<img
						style={{
							width: 70,
							height: 70,
							position: "absolute",
							animation: `randomItem${Date.now()} 0.5s`,
						}}
						src={this.props.computer.hinhAnh}
						alt={this.props.computer.ma}
					/>
				</div>
				<div className='speech-bubble'></div>
				<img
					style={{ width: 150, height: 150 }}
					src='./game_oan_tu_ti/playerComputer.png'
					alt='computer'
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		computer: state.BTOanTuTiReducer.computer,
	};
};

export default connect(mapStateToProps)(Computer);
