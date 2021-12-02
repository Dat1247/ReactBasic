import React, { useState, useRef } from "react";

export default function DemoUseRef(props) {
	let inputUsername = useRef(null);
	let inputPassword = useRef(null);

	let username = useRef("");

	let [userLogin, setUserLogin] = useState({ username: "" });

	const handleLogin = () => {
		// let {name, value} = inputUsername.current;
		// console.log(inputUsername.current);
		// console.log(inputPassword.current);

		console.log("username", username);
		console.log("userlogin", userLogin.username);

		username.current = "abc";
		setUserLogin({
			username: username,
		});
	};

	return (
		<div className='container'>
			<h3>Login</h3>
			<div className='from-group'>
				<h3>Username</h3>
				<input
					ref={inputUsername}
					type='text'
					name='username'
					className='form-control'
				/>
			</div>
			<div className='from-group'>
				<h3>Password</h3>
				<input
					ref={inputPassword}
					type='text'
					name='password'
					className='form-control'
				/>
			</div>
			<div className='from-group'>
				<button
					className='btn btn-success'
					onClick={() => {
						handleLogin();
					}}>
					Login
				</button>
			</div>
		</div>
	);
}
