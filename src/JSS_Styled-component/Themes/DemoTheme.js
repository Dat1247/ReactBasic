import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";

const configTheme = {
	background: "#000",
	color: "#fff",
	fontSize: "15px",
	fontWeight: "bold",
};

const configLightTheme = {
	background: "#6633ff",
	color: "#fff",
	fontWeight: "bold",
	fontSize: "18px",
};
export default class DemoTheme extends Component {
	state = {
		currentTheme: configTheme,
	};

	setTheme = (e) => {
		this.setState({
			currentTheme: e.target.value == "true" ? configTheme : configLightTheme,
		});
	};

	render() {
		const DivStyle = styled.div`
			color: ${(props) => props.theme.color};
			padding: 5%;
			background-color: ${(props) => props.theme.background};
			font-size: ${(props) => props.theme.fontSize};
			font-weight: ${(props) => props.theme.fontWeight};
		`;

		return (
			<ThemeProvider theme={this.state.currentTheme}>
				<DivStyle>Hello everyone</DivStyle>
				<select onChange={this.setTheme}>
					<option value='true'>Dark Theme</option>
					<option value='false'>Light Theme</option>
				</select>
			</ThemeProvider>
		);
	}
}
