import React, { useReducer } from "react";

export const context = React.createContext();

let initialCart = [];
let cartReducer = (state, action) => {
	switch (action.type) {
		case "addToCart": {
			let cartUpdate = [...state];
			let index = state.findIndex((item) => item.id === action.item.id);
			if (index !== -1) {
				// state[index] = { ...state[index], quantity: state[index].quantity + 1 };
				cartUpdate[index] = {
					...cartUpdate[index],
					quantity: cartUpdate[index].quantity + 1,
				};
				return cartUpdate;
			}
			return [...state, { ...action.item, quantity: 1 }];
		}
		default:
			return [...state];
	}
};

export default function ContextProvider(props) {
	let [cart, dispatch] = useReducer(cartReducer, initialCart);

	// store giống như rootReducer bên Redux
	const store = {
		cartReducer: [cart, dispatch],
	};

	//Dùng context bao bọc tất cả component bên trong
	return <context.Provider value={store}>{props.children}</context.Provider>;
}
