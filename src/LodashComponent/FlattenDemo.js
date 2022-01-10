import React from "react";
import _ from "lodash";
export default function FlattenDemo() {
	const arr = [[1, [2, [3, [4]]], 5]];

	const result = _.flatten(arr);
	const result2 = _.flattenDeep(arr);

	console.log("result", result);
	console.log("result2", result2);

	return <div></div>;
}
