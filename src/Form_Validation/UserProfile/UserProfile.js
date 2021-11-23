import React, { Component } from "react";
import "../../Form_Validation/FormValidation.css";
import Swal from "sweetalert2";

export default class UserProfile extends Component {
	state = {
		values: {
			firstName: "",
			lastName: "",
			userName: "",
			email: "",
			password: "",
			passWordConfirm: "",
		},
		errors: {
			firstName: "",
			lastName: "",
			userName: "",
			email: "",
			password: "",
			passWordConfirm: "",
		},
	};

	handleChangeValue = (event) => {
		let { name, value, type } = event.target;

		let newValues = { ...this.state.values, [name]: value };
		let newErrors = { ...this.state.errors };

		if (value.trim() === "") {
			newErrors[name] = name + " is required !";
		} else {
			newErrors[name] = "";
		}
		if (type === "email") {
			const regex =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (!value.match(regex)) {
				newErrors[name] = name + " is invalid !";
			} else {
				newErrors[name] = "";
			}
		}

		if (name === "passWordConfirm") {
			if (value === newValues["password"]) {
				newErrors[name] = "";
			} else {
				newErrors[name] = name + " is invalid !";
			}
		}
		this.setState({
			values: newValues,
			errors: newErrors,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		let { values, errors } = this.state;
		let valid = true;

		let profileContent = "";
		let errorContent = "";

		for (let key in values) {
			if (values[key] === "") {
				errorContent += `
                <p class=""> <b class:'text-danger'>${errors[key]} </b></p>
                `;
				valid = false;
			}

			profileContent += `
                <p class=""> <b>${key}:</b> ${values[key]} </p>
            `;
		}

		for (let key in errors) {
			if (errors[key] !== "") {
				errorContent += `
                <p class=""> <b class:'text-danger'>${errors[key]} </b></p>
                `;
				valid = false;
			}
		}
		if (!valid) {
			Swal.fire({
				title: "Your profile!",
				html: errorContent,
				icon: "error", //success, error, warning, question
				confirmButtonText: "OK",
			});
			return;
		}

		Swal.fire({
			title: "Your profile!",
			html: profileContent,
			icon: "success", //success, error, warning, question
			confirmButtonText: "OK",
		});
	};

	render() {
		return (
			<div
				style={{
					backgroundColor: "#eee",
					width: "100%",
					height: "100%",
				}}
				className='container-fluid d-flex justify-content-center'>
				<form
					className=' bg-white p-5 m-5'
					style={{
						fontFamily:
							' "Google Sans", "Noto Sans Myanmar UI", arial, sans-serif',
						width: 600,
					}}
					onSubmit={this.handleSubmit}>
					<h1 className='text-center mt-0 mb-5'>User Profile</h1>
					<div className='row'>
						<div className='col-6'>
							<div className='group'>
								<input
									value={this.state.values.firstName}
									type='text'
									name='firstName'
									required
									onChange={this.handleChangeValue}
								/>
								<span className='highlight' />
								<span className='bar' />
								<label>firstName</label>
								<span className='text text-danger'>
									{this.state.errors.firstName}
								</span>
							</div>
						</div>
						<div className='col-6'>
							<div className='group'>
								<input
									value={this.state.values.lastName}
									type='text'
									name='lastName'
									required
									onChange={this.handleChangeValue}
								/>
								<span className='highlight' />
								<span className='bar' />
								<label>lastName</label>
								<span className='text text-danger'>
									{this.state.errors.lastName}
								</span>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-12'>
							<div className='group'>
								<input
									value={this.state.values.userName}
									type='text'
									name='userName'
									required
									onChange={this.handleChangeValue}
								/>
								<span className='highlight' />
								<span className='bar' />
								<label>userName</label>
								<span className='text text-danger'>
									{this.state.errors.userName}
								</span>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col-12'>
							<div className='group'>
								<input
									value={this.state.values.email}
									type='email'
									name='email'
									required
									onChange={this.handleChangeValue}
								/>
								<span className='highlight' />
								<span className='bar' />
								<label>Email</label>
								<span className='text text-danger'>
									{this.state.errors.email}
								</span>
							</div>
						</div>
					</div>

					<div className='row'>
						<div className='col-6'>
							<div className='group'>
								<input
									value={this.state.values.password}
									type='text'
									name='password'
									required
									onChange={this.handleChangeValue}
								/>
								<span className='highlight' />
								<span className='bar' />
								<label>password</label>
								<span className='text text-danger'>
									{this.state.errors.password}
								</span>
							</div>
						</div>
						<div className='col-6'>
							<div className='group'>
								<input
									value={this.state.values.passWordConfirm}
									type='text'
									name='passWordConfirm'
									required
									onChange={this.handleChangeValue}
								/>
								<span className='highlight' />
								<span className='bar' />
								<label>passWordConfirm</label>
								<span className='text text-danger'>
									{this.state.errors.passWordConfirm}
								</span>
							</div>
						</div>
					</div>
					<div className='row'>
						<button
							className='btn bg-dark text-white w-100 col-12'
							style={{ fontSize: 20 }}>
							SUBMIT
						</button>
					</div>
				</form>
			</div>
		);
	}
}
