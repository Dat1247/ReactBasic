import React from "react";
import _ from "lodash";

export default function LastFirstDemo() {
	const arrStudent = [
		{ id: 1, name: "Peter" },
		{ id: 2, name: "John" },
		{ id: 3, name: "Bake" },
	];

	const arr = [
		["001", "Alice"],
		["002", "Bob"],
		["003", "John"],
	];

	const firstItem = _.first(arrStudent);
	const lastItem = _.last(arrStudent);

	const [id, name] = _.first(arr);
	const [id2, name2] = _.last(arr);

	return (
		<div>
			<div>FirstItem: {firstItem.name}</div>
			<div>LastItem: {lastItem.name}</div>

			<br />

			<p>
				{id} - {name}
			</p>
			<p>
				{id2} - {name2}
			</p>
		</div>
	);
}
