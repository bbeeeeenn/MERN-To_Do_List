import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home/home.jsx";
import Auth from "./Auth/auth.jsx";

export default function App() {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/*" element={<Auth />} />
			<Route path="*" element={<h1>Not Found</h1>} />
		</Routes>
	);
}
