import "./App.css";
import ContextProvider from "./Hooks/Context/ContextProvider";
import DemoHookUseCallback from "./Hooks/DemoHookUseCallback";
import DemoHookUseContext from "./Hooks/DemoHookUseContext";
import DemoHookUseMemo from "./Hooks/DemoHookUseMemo";
import DemoHookUseReducer from "./Hooks/DemoHookUseReducer";
import DemoHookUseState from "./Hooks/DemoHookUseState";
import DemoReduxApp from "./Hooks/DemoReduxApp";
import DemoUseEffect from "./Hooks/DemoUseEffect";
import DemoUseRef from "./Hooks/DemoUseRef";
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
			<DemoReduxApp />
		</ContextProvider>
	);
}

export default App;
