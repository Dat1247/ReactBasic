import styled from "styled-components";
import React from "react";

// export const Link = ({ className, children, ...restProps }) => {
// 	return <a className={className}>{children}</a>;
// };

export const Link = ({ className, children, ...restProps }) => (
	<a className={className}>{children}</a>
);

//Style chỉ định nghĩa CSS cho các thẻ component cơ bản , chứ không định nghĩa nội dung cho nó
export const StyledLink = styled(Link)`
	color: palevioletred !important;
	font-weight: bold;
	background-color: #eee;
`;
