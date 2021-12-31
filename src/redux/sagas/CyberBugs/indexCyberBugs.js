import React, { useEffect } from "react";
import CotentMain from "../../../components/CyberBugs/MainCyberBugs/CotentMain";
import HeaderMain from "../../../components/CyberBugs/MainCyberBugs/HeaderMain";
import InfoMain from "../../../components/CyberBugs/MainCyberBugs/InfoMain";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROJECT_DETAIL_SAGA } from "../../constants/CyberBugs/CyberBugsConstants";

export default function IndexCyberBugs(props) {
	const { projectDetail } = useSelector((state) => state.ProjectReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		//Khi nguoi dung link qua trang nay bang the navlink hoac nguoi dung tu go url, thi ta se lay tham so tu url va goi saga
		const { projectId } = props.match.params;

		dispatch({
			type: GET_PROJECT_DETAIL_SAGA,
			projectId: projectId,
		});
	}, []);
	return (
		<div className='main'>
			<HeaderMain projectDetail={projectDetail} />
			<InfoMain projectDetail={projectDetail} />
			<CotentMain projectDetail={projectDetail} />
		</div>
	);
}
