import { DAT_GHE, HUY_GHE } from "../types/BTBookingTicketType";

const stateDefaults = {
	danhSachGheDaDat: [],
};

const BTBookingTicketReducer = (state = stateDefaults, action) => {
	switch (action.type) {
		case DAT_GHE: {
			let danhSachGheDaDatUpdate = [...state.danhSachGheDaDat];
			let index = danhSachGheDaDatUpdate.findIndex(
				(gheDangDat) => gheDangDat.soGhe === action.ghe.soGhe
			);
			if (index !== -1) {
				danhSachGheDaDatUpdate.splice(index, 1);
			} else {
				danhSachGheDaDatUpdate.push(action.ghe);
			}
			state.danhSachGheDaDat = danhSachGheDaDatUpdate;
			return { ...state };
		}
		case HUY_GHE: {
			let danhSachGheDaDatUpdate = [...state.danhSachGheDaDat];
			let index = danhSachGheDaDatUpdate.findIndex(
				(gheDangDat) => gheDangDat.soGhe === action.soGhe
			);
			if (index !== -1) {
				danhSachGheDaDatUpdate.splice(index, 1);
			}
			state.danhSachGheDaDat = danhSachGheDaDatUpdate;
			return { ...state };
		}
		default:
			return { ...state };
	}
};

export default BTBookingTicketReducer;
