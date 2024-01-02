import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Login() {
	const navigate = useNavigate();
	const [form, setForm] = useState({ username: "", password: "" });
	const [loggedIn, setLoggedIn] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get("/status");
				if (response.data.loggedIn) {
					navigate("/home");
				} else {
					setLoggedIn(false);
				}
			} catch (err) {
				console.error(err);
			}
		})();
	}, []);

	const handleUsernameChange = (e) => {
		setForm((prev) => ({ ...prev, username: e.target.value }));
	};
	const handlePasswordChange = (e) => {
		setForm((prev) => ({ ...prev, password: e.target.value }));
	};

	async function handleFormSubmit() {
		try {
			const response = await axios.post("/login", form);
			setErrorMessage("");
			navigate("/home");
			console.log(response);
		} catch (err) {
			setErrorMessage(err.response.data.msg);
			console.error(err);
		}
	}

	return loggedIn ? (
		""
	) : (
		<>
			<h1>Login</h1>
			<hr />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleFormSubmit();
				}}
			>
				<label htmlFor="username">Username</label>
				<br />
				<input
					type="text"
					id="username"
					value={form.username}
					onChange={handleUsernameChange}
					autoComplete="off"
				/>
				<br />
				<label htmlFor="password">Password</label>
				<br />
				<input
					type="password"
					id="password"
					value={form.password}
					onChange={handlePasswordChange}
					autoComplete="off"
				/>
				<br />
				<button type="submit">Login</button>
			</form>
			<p style={{ color: "red" }}>{errorMessage}</p>
			<br />
			<hr />
			<p>
				Don't have an account? <Link to="/signup">Sign Up</Link>
			</p>
		</>
	);
}
