import "./App.css";
import BTGameBauCua from "./BaiTapTongHop/BTGameBauCua/BTGameBauCua";
import ContextProvider from "./Hooks/Context/ContextProvider";
// import DemoHookUseCallback from "./Hooks/DemoHooks/DemoHookUseCallback";
// import DemoHookUseContext from "./Hooks/DemoHooks/DemoHookUseContext";
// import DemoHookUseMemo from "./Hooks/DemoHooks/DemoHookUseMemo";
// import DemoHookUseReducer from "./Hooks/DemoHooks/DemoHookUseReducer";
// import DemoHookUseState from "./Hooks/DemoHooks/DemoHookUseState";
// import DemoReduxApp from "./Hooks/DemoHooks/DemoReduxApp";
// import DemoUseEffect from "./Hooks/DemoHooks/DemoUseEffect";
// import DemoUseRef from "./Hooks/DemoHooks/DemoUseRef";
import DemoUseSpring from "./Hooks/ReactSpring/DemoUseSpring";
import Ex2UseSpring from "./Hooks/ReactSpring/Ex2UseSpring";
import Ex3UseSprings from "./Hooks/ReactSpring/Ex3UseSprings";
import Ex4UseTrail from "./Hooks/ReactSpring/Ex4UseTrail";
import Ex5UseTransition from "./Hooks/ReactSpring/Ex5UseTransition";
import Ex6UseChain from "./Hooks/ReactSpring/Ex6UseChain";
// import TodoList from "./JSS_Styled-component/BTStyledComponent/TodoList/TodoList";
// import LifeCycleReact from "./LifeCycleReact/LifeCycleReact";
// import UserProfile from "./Form_Validation/UserProfile/UserProfile";
// import DemoJSS from "./JSS_Styled-component/DemoJSS/DemoJSS";
// import DemoTheme from "./JSS_Styled-component/Themes/DemoTheme";

function App() {
	return (
		<ContextProvider>
			{/* <UserProfile /> */}
			{/* <DemoJSS /> */}
			{/* <DemoTheme /> */}
			{/* <TodoList /> */}
			{/* <LifeCycleReact /> */}
			{/* <DemoHookUseState /> */}
			{/* <DemoUseEffect /> */}
			{/* <DemoHookUseCallback /> */}
			{/* <DemoHookUseMemo /> */}
			{/* <DemoUseRef /> */}
			{/* <DemoHookUseReducer />? */}
			{/* <DemoHookUseContext /> */}
			{/* <DemoReduxApp /> */}
			{/* <DemoUseSpring /> */}
			{/* <Ex2UseSpring /> */}
			{/* <Ex3UseSprings /> */}
			{/* <Ex4UseTrail /> */}
			{/* <Ex5UseTransition /> */}
			{/* <Ex6UseChain /> */}
			<BTGameBauCua />
		</ContextProvider>
	);
}

export default App;
