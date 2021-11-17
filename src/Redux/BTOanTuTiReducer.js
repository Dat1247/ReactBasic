const stateDefaults = {
	mangDatCuoc: [
		{ ma: "keo", hinhAnh: "./game_oan_tu_ti/keo.png", datCuoc: false },
		{ ma: "bua", hinhAnh: "./game_oan_tu_ti/bua.png", datCuoc: false },
		{ ma: "bao", hinhAnh: "./game_oan_tu_ti/bao.png", datCuoc: true },
	],
	ketQua: "I'm iron man, i love you 3000 !!!",
	soBanThang: 0,
	soBanChoi: 0,
	computer: { ma: "bao", hinhAnh: "./game_oan_tu_ti/bao.png" },
};

const BTOanTuTiReducer = (state = stateDefaults, action) => {
	switch (action.type) {
		case "CHON_KEO_BUA_BAO":
			let mangCuocUpdate = [...state.mangDatCuoc];
			mangCuocUpdate = mangCuocUpdate.map((item, index) => {
				if (item.ma === action.maCuoc) {
					return { ...item, datCuoc: true };
				}
				return { ...item, datCuoc: false };
			});

			state.mangDatCuoc = mangCuocUpdate;
			return { ...state };

		case "RAN_DOM":
			let soNgauNhien = Math.floor(Math.random() * 3);
			let quanCuocNgauNhien = state.mangDatCuoc[soNgauNhien];
			state.computer = quanCuocNgauNhien;
			return { ...state };
		case "END_GAME":
			let player = state.mangDatCuoc.find((item) => item.datCuoc === true);
			let computer = state.computer;
			switch (player.ma) {
				case "keo":
					if (computer.ma === "keo") {
						state.ketQua = "HOÀ !!!";
					} else if (computer.ma === "bua") {
						state.ketQua = "THUA SML !!!";
					} else {
						state.soBanThang += 1;
						state.ketQua = "I'm iron man, i love you 3000 !!!";
					}
					break;
				case "bua":
					if (computer.ma === "bua") {
						state.ketQua = "HOÀ !!!";
					} else if (computer.ma === "bao") {
						state.ketQua = "THUA SML !!!";
					} else {
						state.soBanThang += 1;
						state.ketQua = "I'm iron man, i love you 3000 !!!";
					}
					break;
				case "bao":
					if (computer.ma === "bao") {
						state.ketQua = "HOÀ !!!";
					} else if (computer.ma === "keo") {
						state.ketQua = "THUA SML !!!";
					} else {
						state.soBanThang += 1;
						state.ketQua = "I'm iron man, i love you 3000 !!!";
					}
					break;
				default:
					state.ketQua = "I'm iron man, i love you 3000 !!!";
					return { ...state };
			}
			state.soBanChoi += 1;
			return { ...state };
		default:
			return { ...state };
	}
};

export default BTOanTuTiReducer;
