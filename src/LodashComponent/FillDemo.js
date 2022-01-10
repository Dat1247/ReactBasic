import React from "react";
import _ from "lodash";

export default function FillDemo() {
	let arr = [
		{ id: 1, name: "Iphone" },
		{ id: 2, name: "Iphone X" },
		{ id: 3, name: "Iphone XS" },
	];

	const newArr = _.fill(arr, { id: 5, name: "Samsung Galaxy" }, 1, 2);

	console.log(newArr);
	return <div></div>;
}
