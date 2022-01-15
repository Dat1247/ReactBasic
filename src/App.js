import "./App.css";
import { Suspense, lazy } from "react";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./components/Loading/Loading";

// const CheckoutTemplateLazy = lazy(() =>
// 	import("./templates/CheckoutTemplate/CheckoutTemplate")
// );

export const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<Loading />
			<Switch>
				<HomeTemplate path='/' exact Component={Home} />
				<HomeTemplate path='/home' exact Component={Home} />
				<HomeTemplate path='/contact' exact Component={Contact} />
				<HomeTemplate path='/news' exact Component={News} />
				<HomeTemplate path='/detail/:id' exact Component={Detail} />
				{/* <Suspense fallback={<h1>LOADING...</h1>}>
					<CheckoutTemplateLazy
						path='/checkout/:id'
						exact
						Component={Checkout}
					/>
				</Suspense> */}
				<CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />
				<UserTemplate path='/login' exact Component={Login} />
				<Route path='/register' exact Component={Register} />
			</Switch>
		</Router>
	);
}

export default App;
