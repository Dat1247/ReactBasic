import React, { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";

export const HomeTemplate = (props) => {
	const { Component, ...restRoute } = props;

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	return (
		<Route
			{...restRoute}
			render={(propsRoute) => {
				// propsRoute return props.location, props.history, props.match
				return (
					<Fragment>
						<Header {...propsRoute} />
						<Component {...propsRoute} />
						{/* <footer className='bg-black text-white'>
							Day la footer home page
						</footer> */}
						<Footer />
					</Fragment>
				);
			}}
		/>
	);
};
