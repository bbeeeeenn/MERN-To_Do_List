import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import LoginForm from "./LoginForm";
import Connecting from "../../Components/Connecting";
import ServerError from "../../Components/ServerError";

export default function Login() {
	const navigate = useNavigate();

	const [status, setStatus] = useState("connecting");

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get("/status");
				if (response.data.loggedIn) {
					navigate("/home");
				} else {
					setStatus("not-logged-in");
					navigate("/");
				}
			} catch (err) {
				if (err.code == "ERR_NETWORK") {
					setStatus("server-error");
				} else {
					console.error(err);
				}
			}
		})();
	}, []);

	return status == "connecting" ? (
		<Connecting />
	) : status == "not-logged-in" ? (
		<LoginForm navigate={navigate} />
	) : status == "server-error" ? (
		<ServerError />
	) : (
		<h1>Unknown Error</h1>
	);
}
