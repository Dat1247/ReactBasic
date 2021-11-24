import styled from "styled-components";

export const Button = styled.button`
	background: ${(props) => (props.primary ? "blue" : "green")};
	color: ${(props) => props.colorPurple || "white"};
	border: none;
	border-radius: 0.5rem;
	font-weight: bold;
	font-size: ${(props) => (props.fSize2x ? "2rem" : "1rem")};
	padding: 1rem;
	margin: 1rem;
	opacity: 1;
	transition: all 0.6s;
	&:hover {
		opacity: 0.7;
	}
	&.button_style {
	}
`;

export const SmallButton = styled(Button)`
	background-color: red;
	font-size: 0.5rem;
`;
