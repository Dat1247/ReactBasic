import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Header from "./components/Home/Header/Header";
import Modal from "./HOC/Modal/Modal";
import About from "./pages/About/About";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import Contact from "./pages/Contact/Contact";
import DemoHOCModal from "./pages/DemoHOC/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import Todolist from "./pages/Todolist/Todolist";
import TodolistRedux from "./pages/Todolist/TodolistRedux";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";

function App() {
	return (
		<BrowserRouter>
			{/* <Header /> */}
			<Modal />
			<LoadingComponent />
			<Switch>
				{/* <Route
					exact
					path='/home'
					// component={Home}
					render={(propsRoute) => {
						return (
							<div>
								<Header />
								<Home {...propsRoute} />
							</div>
						);
					}}
				/> */}
				<HomeTemplate path='/home' exact Component={Home} />
				<Route
					exact
					path='/contact'
					render={(propsRoute) => {
						return (
							<div style={{ background: "#fff" }}>
								<Contact {...propsRoute} />
							</div>
						);
					}}
				/>
				<HomeTemplate exact path='/about' Component={About} />
				<HomeTemplate exact path='/login' Component={Login} />
				<HomeTemplate exact path='/detail/:id' Component={Detail} />
				<HomeTemplate exact path='/profile' Component={Profile} />
				<HomeTemplate exact path='/todolistrfc' cCmponent={TodolistRFC} />
				<HomeTemplate exact path='/todolistrcc' Component={Todolist} />
				<HomeTemplate exact path='/todolistredux' Component={TodolistRedux} />
				<HomeTemplate
					exact
					path='/todolistsaga'
					Component={BaiTapToDoListSaga}
				/>
				<HomeTemplate exact path='/demohocmodal' Component={DemoHOCModal} />

				<HomeTemplate exact path='/' Component={Home} />
				<HomeTemplate path='*' Component={PageNotFound} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
