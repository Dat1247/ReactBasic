import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";

import About from "./pages/About/About";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import Contact from "./pages/Contact/Contact";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import DemoHOCModal from "./pages/DemoHOC/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";

import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import Todolist from "./pages/Todolist/Todolist";
import TodolistRedux from "./pages/Todolist/TodolistRedux";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import { useDispatch } from "react-redux";
import CyberBugsTemplate from "./templates/HomeTemplate/CyberBugsTemplate";
import indexCyberBugs from "./redux/sagas/CyberBugs/indexCyberBugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";

import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DrawerCyberbugs from "./HOC/CyberbugsHOC/DrawerCyberbugs";

function App() {
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		// console.log(history);
		dispatch({
			type: "ADD_HISTORY",
			history: history,
		});
	}, []);

	return (
		<>
			{/* <Header /> */}
			{/* <Modal /> */}
			<LoadingComponent />
			<DrawerCyberbugs />
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
				<UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
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
				<CyberBugsTemplate exact path='/cyberbugs' Component={indexCyberBugs} />
				<CyberBugsTemplate
					exact
					path='/createproject'
					Component={CreateProject}
				/>
				<CyberBugsTemplate
					exact
					path='/projectmanagement'
					Component={ProjectManagement}
				/>

				<CyberBugsTemplate
					exact
					path='/projectdetail/:projectId'
					Component={indexCyberBugs}
				/>

				<CyberBugsTemplate exact path='/' Component={ProjectManagement} />
				<HomeTemplate path='*' Component={PageNotFound} />
			</Switch>
		</>
	);
}

export default App;
