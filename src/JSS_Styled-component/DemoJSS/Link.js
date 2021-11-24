import styled from "styled-components";
import React from "react";

// export const Link = ({ className, children, ...restProps }) => {
// 	return <a className={className}>{children}</a>;
// };

export const Link = ({ className, children, ...restProps }) => (
	<a className={className}>{children}</a>
);

export const StyledLink = styled(Link)`
	color: palevioletred !important;
	font-weight: bold;
	background-color: #eee;
`;
