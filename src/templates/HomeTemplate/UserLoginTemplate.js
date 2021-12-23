import React, { Fragment, useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => {
	const [size, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		window.onresize = () => {
			setSize({ width: window.innerWidth, height: window.innerHeight });
		};
	}, []);

	let { Component, ...restRoute } = props;
	return (
		<Route
			{...restRoute}
			render={(propsRoute) => {
				return (
					<Fragment>
						<Layout>
							<Sider
								width={size.width / 2}
								style={{
									height: size.height,
									backgroundImage: "url(https://picsum.photos/2000)",
									backgroundSize: "100%",
								}}></Sider>
							<Layout>
								<Component {...propsRoute} />
							</Layout>
						</Layout>
					</Fragment>
				);
			}}
		/>
	);
};
