import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "../../components/Home/Header/Header";

export default function HomeTemplate(props) {
	const { Component, ...restParam } = props;
	return (
		<Route
			// path={restParam.path}
			{...restParam}
			render={(propsRoute) => {
				return (
					<Fragment>
						<Header />
						<Component {...propsRoute} />
					</Fragment>
				);
			}}
		/>
	);
}
