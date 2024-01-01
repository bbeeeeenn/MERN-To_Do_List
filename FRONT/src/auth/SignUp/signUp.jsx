import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
	const [form, setForm] = useState({
		username: "",
		password: "",
		repeatedPassword: "",
	});
	const { username, password, repeatedPassword } = form;

	const [usernameValid, setUsernameValid] = useState(true);
	const passwordValid = password.length >= 5;
	const repeatedPasswordValid =
		password.length >= 5 && repeatedPassword === password;

	const [showPassword, setShowPassword] = useState(false);

	const handleUsernameChange = (e) => {
		setForm((prev) => ({ ...prev, username: e.target.value }));
	};
	const handlePasswordChange = (e) => {
		setForm((prev) => ({ ...prev, password: e.target.value }));
	};
	const handleRepeatPasswordChange = (e) => {
		setForm((prev) => ({ ...prev, repeatedPassword: e.target.value }));
	};

	// console.log(form);

	return (
		<>
			<h1>Sign Up</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<label htmlFor="username">
					Username
					{username.length === 0 ? (
						<small className="warning"> *</small>
					) : (
						""
					)}
				</label>
				<br />
				<input
					type="text"
					id="username"
					onChange={handleUsernameChange}
					className={usernameValid ? "valid" : ""}
					autoComplete="off"
				/>
				<br />
				<label htmlFor="password">
					Password
					{password.length == 0 ? (
						<small className="warning"> *</small>
					) : password.length < 5 ? (
						<small className="warning">
							{" "}
							(Password must be at least 5 characters long.)
						</small>
					) : (
						""
					)}
				</label>
				<br />
				<input
					type={showPassword ? "text" : "password"}
					id="password"
					onChange={handlePasswordChange}
					className={
						password.length === 0
							? ""
							: passwordValid
							? "valid"
							: "invalid"
					}
					autoComplete="off"
				/>
				<br />
				<label htmlFor="repeatPassword">
					Repeat Password
					{repeatedPassword.length === 0 ? (
						<small className="warning"> *</small>
					) : repeatedPassword.length < 5 ? (
						<small className="warning">
							{" "}
							(Password must be at least 5 characters long.)
						</small>
					) : repeatedPassword !== password ? (
						<small className="warning"> (Password doesn't match)</small>
					) : (
						""
					)}
				</label>
				<br />
				<input
					type={showPassword ? "text" : "password"}
					id="repeatPassword"
					onChange={handleRepeatPasswordChange}
					className={
						repeatedPassword.length === 0
							? ""
							: repeatedPassword.length < 5
							? "invalid"
							: repeatedPasswordValid
							? "valid"
							: "invalid"
					}
				/>
				<br />
				<input
					type="checkbox"
					onChange={() => {
						setShowPassword((prev) => !prev);
					}}
				/>
				<small> (Show passwords)</small>
				<br />
				<br />
				<button
					type="submit"
					disabled={!usernameValid || !repeatedPasswordValid}
				>
					Sign Up
				</button>
			</form>
			<br />
			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</>
	);
}
