import { Routes, Route, Link } from "react-router-dom";
import Login from "./Auth/Login/login.jsx";
import Signup from "./Auth/SignUp/signUp.jsx";
import NotFound from "./NotFound/notFound.jsx";

export default function App() {
	return (
		<Routes>
			<Route index element={<h1>To-Do Lists</h1>} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
