import React, { Component } from "react";
import { Button, SmallButton } from "../Components/Button";
import { TextField } from "../Components/TextField";
import { StyledLink } from "./Link";

export default class DemoJSS extends Component {
	render() {
		return (
			<div>
				<Button className='button_style' primary>
					Hello
				</Button>
				<Button fSize2x colorPurple='purple'>
					Hi
				</Button>
				<SmallButton>Xin chào</SmallButton>
				<StyledLink>abcd</StyledLink>
				<TextField inputColor='green' />
			</div>
		);
	}
}
