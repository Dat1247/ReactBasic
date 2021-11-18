import { combineReducers } from "redux";
import BTGioHangReducer from "./BTGioHangReducer";
import BaiTapGameXucXacReducer from "./BTXucXacReducer";
import BTOanTuTiReducer from "./BTOanTuTiReducer";
import BTBookingTicketReducer from "./BTBookingTicketReducer";

const rootReducer = combineReducers({
	//Store tổng của ứng dụng
	stateGioHang: BTGioHangReducer, //BT gio hang
	BaiTapGameXucXacReducer, //BT Game xuc xac
	BTOanTuTiReducer,
	BTBookingTicketReducer,
});

export default rootReducer;
