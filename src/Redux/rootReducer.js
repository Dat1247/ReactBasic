import { combineReducers } from "redux";
import BTGioHangReducer from "./BTGioHangReducer";
import BaiTapGameXucXacReducer from "./BTXucXacReducer";

const rootReducer = combineReducers({
	//Store tổng của ứng dụng
	stateGioHang: BTGioHangReducer, //BT gio hang
	BaiTapGameXucXacReducer, //BT Game xuc xac
});

export default rootReducer;
