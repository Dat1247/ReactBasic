import { SET_CAROUSEL } from "../types/CarouselType";

const initialState = {
	arrBanner: [],
};

export const CarouselReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CAROUSEL: {
			state.arrBanner = action.arrBanner;
			return { ...state };
		}
		default:
			return { ...state };
	}
};
