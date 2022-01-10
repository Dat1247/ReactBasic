import React from "react";
import _ from "lodash";

export default function SortByDemo() {
	let users = [
		{ name: "John", age: 40 },
		{ name: "Iris", age: 25 },
		{ name: "Sam", age: 40 },
		{ name: "Jane", age: 18 },
		{ name: "Anna", age: 20 },
		{ name: "Anna", age: 18 },
	];

	const sortAge = _.sortBy(users, [(item) => item.age]);
	const sortName = _.sortBy(users, [(item) => item.name]);

	// console.log("sortAge", sortAge);
	// console.log("sortName", sortName);

	const result = _.sortBy(users, ["name", "age"]);

	console.log(result);

	return <div></div>;
}
