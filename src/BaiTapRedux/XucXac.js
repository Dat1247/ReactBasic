import React, { Component } from "react";
import { connect } from "react-redux";

class XucXac extends Component {
	renderXucXac = () => {
		return this.props.mangXucXac.map((xucXac, index) => {
			return (
				<img
					key={index}
					style={{ width: 35, height: 35 }}
					className='ml-1'
					src={xucXac.hinhAnh}
					alt={xucXac.ma}
				/>
			);
		});
	};
	render() {
		return <div>{this.renderXucXac()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		mangXucXac: state.BaiTapGameXucXacReducer.mangXucXac,
	};
};

export default connect(mapStateToProps)(XucXac);
