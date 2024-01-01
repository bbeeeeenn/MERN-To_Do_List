import Login from "./Login/login.jsx";
import Signup from "./SignUp/signUp.jsx";
import NotFound from "../NotFound/notFound.jsx";
import { Link, Route, Routes } from "react-router-dom";
import "./auth.css";

export default function Auth() {
	return (
		<>
			<Link to="/">
				<button>&lt;- Home</button>
			</Link>
			<br />
			<br />
			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}
