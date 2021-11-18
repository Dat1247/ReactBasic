const stateDefaults = {
	// True: tai (> 12), False: xiu (tu 3 > 11)
	taiXiu: true,
	mangXucXac: [
		{ ma: 1, hinhAnh: "./game_xuc_xac/1.png" },
		{ ma: 1, hinhAnh: "./game_xuc_xac/1.png" },
		{ ma: 1, hinhAnh: "./game_xuc_xac/1.png" },
	],
	soBanThang: 0,
	tongSoBanChoi: 0,
};

const BaiTapGameXucXacReducer = (state = stateDefaults, action) => {
	switch (action.type) {
		case "DAT_CUOC":
			state.taiXiu = action.taiXiu;
			return { ...state };
		case "PLAY_GAME": {
			//B1: xu ly xuc xac
			let mangXucXacNgauNhien = [];
			for (let i = 0; i < 3; i++) {
				let soNgauNhien = Math.floor(Math.random() * 6) + 1;
				let xucXacNgauNhien = {
					ma: soNgauNhien,
					hinhAnh: `./game_xuc_xac/${soNgauNhien}.png`,
				};
				mangXucXacNgauNhien.push(xucXacNgauNhien);
			}
			state.mangXucXac = mangXucXacNgauNhien;

			//B2: xu ly tong so ban choi
			state.tongSoBanChoi += 1;

			//B3: xu ly ban thang
			let tongDiem = mangXucXacNgauNhien.reduce((tongDiem, xucXac, index) => {
				return (tongDiem += xucXac.ma);
			}, 0);
			if (
				(tongDiem > 11 && state.taiXiu) ||
				(tongDiem <= 11 && !state.taiXiu)
			) {
				state.soBanThang += 1;
			}
			return { ...state };
		}
		default:
			return { ...state };
	}
};

export default BaiTapGameXucXacReducer;
