import React from "react";
import _ from "lodash";

export default function CompareDemo() {
	const arrA = [1, 2];
	const arrB = [1, 2];

	const arrObject1 = [
		{ id: 1, name: "Age" },
		{ id: 3, name: "Anne" },
		{ id: 2, name: "Black" },
	];
	const arrObject2 = [
		{ id: 1, name: "Age" },
		{ id: 2, name: "Bla" },
	];

	const result = _.isEqual(arrA, arrB);
	const result2 = _.differenceWith(arrObject1, arrObject2, _.isEqual);
	console.log(result);

	console.log(result2);

	return <div></div>;
}
