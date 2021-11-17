import { combineReducers } from "redux";
import BTGioHangReducer from "./BTGioHangReducer";
import BaiTapGameXucXacReducer from "./BTXucXacReducer";
import BTOanTuTiReducer from "./BTOanTuTiReducer";

const rootReducer = combineReducers({
	//Store tổng của ứng dụng
	stateGioHang: BTGioHangReducer, //BT gio hang
	BaiTapGameXucXacReducer, //BT Game xuc xac
	BTOanTuTiReducer,
});

export default rootReducer;
