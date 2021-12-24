import React from "react";
import CotentMain from "../../../components/CyberBugs/MainCyberBugs/CotentMain";
import HeaderMain from "../../../components/CyberBugs/MainCyberBugs/HeaderMain";
import InfoMain from "../../../components/CyberBugs/MainCyberBugs/InfoMain";

export default function indexCyberBugs(props) {
	return (
		<div className='main'>
			<HeaderMain />
			<h3>Cyber Board</h3>
			<InfoMain />
			<CotentMain />
		</div>
	);
}
