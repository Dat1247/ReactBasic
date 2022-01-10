import React from "react";
import _ from "lodash";

export default function JoinDemo() {
	let arr = ["Khai", "Nam", "Linh"];

	let arrPerson = [
		{ id: 1, name: "John" },
		{ id: 2, name: "Nam" },
		{ id: 3, name: "Linh" },
	];

	//ES6
	const result = arr.join("-");
	const result2 = _.join(arr, "+");
	const person = _.find(arrPerson, (item) => item.name === "Linh");

	return (
		<div>
			{result} = {result2}
			<br />
			{person.name} - {person.id}
		</div>
	);
}
