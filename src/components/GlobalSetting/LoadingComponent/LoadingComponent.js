import React from "react";
import styleLoading from "./LoadingComponent.module.css";
import { useSelector } from "react-redux";

export default function LoadingComponent() {
	const isLoading = useSelector((state) => state.LoadingReducer.isLoading);
	if (isLoading) {
		return (
			<div class={styleLoading.bgLoading}>
				<img
					src={require("../../../assets/imgLoading/loading.gif").default}
					alt='loading'
				/>
			</div>
		);
	} else {
		return "";
	}
}
