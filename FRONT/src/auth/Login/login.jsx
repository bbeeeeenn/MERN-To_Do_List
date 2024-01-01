import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
	const [form, setForm] = useState({ username: "", password: "" });

	const handleUsernameChange = (e) => {
		setForm((prev) => ({ ...prev, username: e.target.value }));
	};
	const handlePasswordChange = (e) => {
		setForm((prev) => ({ ...prev, password: e.target.value }));
	};
	return (
		<>
			<h1>Login</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<label htmlFor="username">Username</label>
				<br />
				<input
					type="text"
					id="username"
					onChange={handleUsernameChange}
					autoComplete="off"
				/>
				<br />
				<label htmlFor="password">Password</label>
				<br />
				<input
					type="password"
					id="password"
					onChange={handlePasswordChange}
					autoComplete="off"
				/>
				<br />
				<button type="submit">Login</button>
			</form>
			<br />
			<p>
				Don't have an account? <Link to="/signup">Sign Up</Link>
			</p>
		</>
	);
}
