import { Routes, Route } from "react-router-dom";
import Auth from "./auth/auth";

export default function App() {
	return (
		<Routes>
			<Route path="/*" element={<Auth />} />
			<Route path="*" element={<h1>Not Found</h1>} />
		</Routes>
	);
}
