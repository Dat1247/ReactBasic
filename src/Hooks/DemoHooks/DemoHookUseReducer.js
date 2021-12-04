import React, { useReducer } from "react";

const initialCart = [
	// { id: 1, name: "IPhone", price: 1000, quantity: 1 }
];

const cartReducer = (state, action) => {
	switch (action.type) {
		case "addToCart": {
			let cartUpdate = [...state];
			let index = cartUpdate.findIndex((item) => item.id === action.item.id);
			if (index !== -1) {
				cartUpdate[index] = {
					...cartUpdate[index],
					quantity: cartUpdate[index].quantity + 1,
				};
			} else {
				const itemCart = { ...action.item, quantity: 1 };
				cartUpdate.push(itemCart);
			}

			return cartUpdate;
		}
		default:
			return [...state];
	}
	// return [...state];
};

let arrProduct = [
	{ id: 1, name: "iphone", price: 1000 },
	{ id: 2, name: "Note 10 plus", price: 5000 },
	{ id: 3, name: "Huawei P20", price: 1200 },
];

export default function DemoHookUseReducer(props) {
	let [cart, dispatch] = useReducer(cartReducer, initialCart);
	const addToCart = (item) => {
		const action = {
			type: "addToCart",
			item: item,
		};
		dispatch(action);
	};
	console.log("render");
	return (
		<div className='container'>
			<div className='row'>
				{arrProduct.map((product, index) => {
					return (
						<div className='col-4' key={index}>
							<div className='card text-left'>
								<img
									className='card-img-top'
									src='https://picsum.photos/200/200'
									alt='{index}'
								/>
								<div className='card-body'>
									<h4 className='card-title'>{product.name}</h4>
									<p className='card-text'>{product.price}</p>
									<button
										className='btn btn-success'
										onClick={() => {
											addToCart(product);
										}}>
										Add to cart
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<h3>Giỏ hàng</h3>
			<table className='table'>
				<thead>
					<tr>
						<th>id</th>
						<th>name</th>
						<th>price</th>
						<th>quantity</th>
						<th>total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{cart.map((item, index) => {
						return (
							<tr key={index}>
								<td>{item.id}</td>
								<td>{item.name}</td>
								<td>{item.price}</td>
								<td>{item.quantity}</td>
								<td>{item.price * item.quantity}</td>
								<td>
									<button className='btn btn-danger'>X</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
