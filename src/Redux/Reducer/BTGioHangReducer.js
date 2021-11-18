//Setup StateGioHang trên store
const stateGioHang = {
	gioHang: [],
};

const BTGioHangReducer = (state = stateGioHang, action) => {
	switch (action.type) {
		case "THEM_GIO_HANG": {
			let index = state.gioHang.findIndex(
				(spGH) => spGH.maSP === action.spGioHang.maSP
			);
			if (index !== -1) {
				state.gioHang[index].soLuong += 1;
			} else {
				state.gioHang.push(action.spGioHang);
			}

			//SetState
			state.gioHang = [...state.gioHang];

			return { ...state };
		}
		case "XOA_GIO_HANG": {
			let gioHangCapNhat = [...state.gioHang];

			//Tìm phần tử cần xóa dựa vào mã sp
			let index = gioHangCapNhat.findIndex((spGH) => spGH.maSP === action.maSP);
			if (index !== -1) {
				gioHangCapNhat.splice(index, 1);
			}

			//Cập nhật lại state giỏ hàng mới để component render lại
			state.gioHang = gioHangCapNhat;
			return { ...state };
		}
		case "TANG_GIAM_SO_LUONG": {
			let gioHangCapNhat = [...state.gioHang];
			let index = gioHangCapNhat.findIndex((spGH) => spGH.maSP === action.maSP);
			if (index !== -1) {
				if (action.tangGiam) {
					gioHangCapNhat[index].soLuong += 1;
				} else {
					if (gioHangCapNhat[index].soLuong > 1) {
						gioHangCapNhat[index].soLuong -= 1;
					} else {
						alert("Số lượng tối thiểu là 1");
					}
				}
			}

			state.gioHang = gioHangCapNhat;
			return { ...state };
		}
		default:
			return { ...state };
	}
};

export default BTGioHangReducer;
