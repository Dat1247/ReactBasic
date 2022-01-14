import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";
const CheckoutTemplate = (props) => {
	const { Component, ...restRoute } = props;

	if (!localStorage.getItem(USER_LOGIN)) {
		return <Redirect to='/login' />;
	}

	return (
		<Route
			{...restRoute}
			render={(propsRoute) => {
				// propsRoute return props.location, props.history, props.match
				return (
					<Fragment>
						<Component {...propsRoute} />
					</Fragment>
				);
			}}
		/>
	);
};

export default CheckoutTemplate;
