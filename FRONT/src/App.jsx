import { Routes, Route } from "react-router-dom";
import Home from "./Home/home.jsx";
import Login from "./Auth/Login/login.jsx";
import Signup from "./Auth/SignUp/signUp.jsx";
import NotFound from "./NotFound/notFound.jsx";
import "./Auth/auth.css";
import { useState, createContext } from "react";

export const Context = createContext();

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	return (
		<Context.Provider value={{ loggedIn, setLoggedIn }}>
			<Routes>
				<Route index element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="home" element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Context.Provider>
	);
}
