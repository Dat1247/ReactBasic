import React, { useState } from "react";
import { Prompt } from "react-router-dom";

export default function Login(props) {
	const [userLogin, setUserLogin] = useState({
		username: "",
		password: "",
		status: false,
	});

	console.log(userLogin);
	const handleChange = (event) => {
		const { name, value } = event.target;
		const newUserLogin = {
			...userLogin,
			[name]: value,
		};
		let valid = true;
		for (let key in userLogin) {
			if (key !== "status") {
				if (newUserLogin[key].trim() === "") {
					valid = false;
				}
			}
		}
		if (!valid) {
			newUserLogin.status = true;
		} else {
			newUserLogin.status = false;
		}
		setUserLogin(newUserLogin);
	};

	const handleLogin = (e) => {
		e.preventDefault();
		if (
			userLogin.username === "cyberlearn" &&
			userLogin.password === "cyberlearn"
		) {
			//Thành công thì chuyển về trang trước đó
			// props.history.goBack();

			//Chuyển đến trang chỉ định sao khi xử lý
			// props.history.push("/home");

			//Thay đổi nội dung path tương ứng
			props.history.replace("/home");
			localStorage.setItem("userLogin", JSON.stringify(userLogin));
		} else {
			alert("Login fail");
			return;
		}
	};

	return (
		<form className='container' onSubmit={handleLogin}>
			<h3 className='display-4'>Login</h3>
			<div className='form-group'>
				<p>Username</p>
				<input
					type='text'
					name='username'
					className='form-control'
					onChange={handleChange}
				/>
			</div>
			<div className='form-group'>
				<p>Password</p>
				<input
					type='text'
					name='password'
					className='form-control'
					onChange={handleChange}
				/>
			</div>
			<div className='form-group'>
				<button className='btn btn-success'>Login</button>
			</div>
			<Prompt
				when={userLogin.status}
				message={(location) => {
					console.log(location);
					return "Bạn cần nhập đầy đủ thông tin";
				}}
			/>
		</form>
	);
}
