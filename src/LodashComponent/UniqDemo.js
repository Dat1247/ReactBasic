import React from "react";
import _ from "lodash";

export default function UniqDemo() {
	const arr = [1, 2, 3, 4, 5, 2, 3, 2];
	const arrObj = [
		{ id: 1, name: "IphoneX", price: 1000 },
		{ id: 2, name: "Iphone", price: 1000 },
		{ id: 3, name: "Iphone XS", price: 1000 },
		{ id: 4, name: "Iphone ", price: 1000 },
		{ id: 5, name: "Iphone Pro Max", price: 1500 },
	];
	// const result = _.uniq(arr);
	const result = _.unionBy(arrObj, "name");
	console.log(result);
	return <div></div>;
}
