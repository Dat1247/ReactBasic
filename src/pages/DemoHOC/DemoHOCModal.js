import React from "react";
import { useDispatch } from "react-redux";
import SldeDown from "../../HOC/Modal/SldeDown";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function DemoHOCModal() {
	// const LoginWithSlideDown = new SldeDown(Login);
	const LoginWithSlideDown = function () {
		return new SldeDown(Login);
	};

	const dispatch = useDispatch();
	return (
		<div>
			<button
				onClick={() => {
					dispatch({
						type: "OPEN_FORM",
						Component: <Login />,
					});
				}}
				type='button'
				className='btn btn-primary btn-lg'
				data-toggle='modal'
				data-target='#modelId'>
				Đăng nhập
			</button>
			<button
				onClick={() => {
					dispatch({
						type: "OPEN_FORM",
						Component: <Register />,
					});
				}}
				type='button'
				className='btn btn-primary btn-lg'
				data-toggle='modal'
				data-target='#modelId'>
				Đăng ký
			</button>
			{/* {LoginWithSlideDown} */}
			<LoginWithSlideDown />
		</div>
	);
}
