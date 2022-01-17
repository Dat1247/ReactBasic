import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";
import { Select } from "antd";
import { useSelector } from "react-redux";
import _ from "lodash";

//Hook đa ngôn ngữ
import { useTranslation } from "react-i18next";
import { TOKEN, USER_LOGIN } from "../../../../util/settings/config";

const { Option } = Select;

export default function Header(props) {
	const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
	const { t, i18n } = useTranslation();

	const handleChange = (value) => {
		i18n.changeLanguage(value);
	};

	const renderLogin = () => {
		if (_.isEmpty(userLogin)) {
			return (
				<Fragment>
					<button
						className='self-center px-8 py-3 rounded'
						onClick={() => {
							history.push("/login");
						}}>
						{t("signin")}
					</button>
					<button
						onClick={() => {
							history.push("/register");
						}}
						className='self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900'>
						{t("register")}
					</button>
				</Fragment>
			);
		}
		return (
			<Fragment>
				<button
					className='self-center px-8 py-3 rounded'
					onClick={() => {
						history.push("/profile");
					}}>
					<b>Hello !</b> {userLogin.taiKhoan}
				</button>
				<button
					onClick={() => {
						localStorage.removeItem(USER_LOGIN);
						localStorage.removeItem(TOKEN);
						history.push("/");
						window.location.reload();
					}}
					className='mr-3'>
					Sign out
				</button>
			</Fragment>
		);
	};

	return (
		<header className='p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black bg-opacity-40 text-white fixed w-full z-10'>
			<div className='container flex justify-between h-16 mx-auto'>
				<NavLink
					to='/'
					aria-label='Back to homepage'
					className='flex items-center p-2'>
					<img
						src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png'
						alt='cyberlearn.vn'
					/>
				</NavLink>
				<ul className='items-stretch hidden space-x-3 lg:flex'>
					<li className='flex'>
						<NavLink
							to='/home'
							activeClassName=' border-white'
							className='flex items-center px-4 -mb-1 border-b-2 border-transparent text-violet-400 border-violet-400 text-white text-xl'>
							Home
						</NavLink>
					</li>
					<li className='flex'>
						<NavLink
							to='/contact'
							className='flex items-center px-4 -mb-1 border-b-2 border-transparent text-white text-xl'
							activeClassName=' border-white'>
							Contact
						</NavLink>
					</li>
					<li className='flex'>
						<NavLink
							to='/news'
							className='flex items-center px-4 -mb-1 border-b-2 border-transparent text-white  text-xl'
							activeClassName=' border-white'>
							News
						</NavLink>
					</li>
				</ul>
				<div className='items-center flex-shrink-0 hidden lg:flex'>
					{renderLogin()}

					<Select
						defaultValue='en'
						style={{ width: 75 }}
						onChange={handleChange}>
						<Option value='en'>Eng</Option>
						<Option value='chi'>Chi</Option>
						<Option value='vi'>Vi</Option>
					</Select>
				</div>
				<button className='p-4 lg:hidden'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						className='w-6 h-6 dark:text-coolGray-100'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M4 6h16M4 12h16M4 18h16'></path>
					</svg>
				</button>
			</div>
		</header>
	);
}
