import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Form({ navigate }) {
	const [form, setForm] = useState({ username: "", password: "" });

	const [errorMessage, setErrorMessage] = useState("");

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
		} catch (err) {
			console.error(err);
			if (!err.response || !err.response.data) {
				setErrorMessage("Unknown Error.");
			} else {
				setErrorMessage(err.response.data.msg);
			}
		}
	}
	return (
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
