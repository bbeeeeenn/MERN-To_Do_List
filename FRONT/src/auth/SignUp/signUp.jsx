import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Connecting from "../../Components/Connecting";
import ServerError from "../../Components/ServerError";

export default function Signup() {
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
					navigate("/signup");
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
		<Form navigate={navigate} />
	) : status == "server-error" ? (
		<ServerError />
	) : (
		<h1>Unknown Error</h1>
	);
}

function Form({ navigate }) {
	const [{ username, password, repeatedPassword }, setForm] = useState({
		username: "",
		password: "",
		repeatedPassword: "",
	});

	const [usernameValid, setUsernameValid] =
		useState(1); /*0 = neutral, 1 = true, 2 = false*/
	const passwordValid = password.length >= 5;
	const repeatedPasswordValid =
		password.length >= 5 && repeatedPassword === password;
	const [showPassword, setShowPassword] = useState(false);

	const [done, setdone] = useState(false);

	const [abortController, setAbortController] = useState(null);
	const handleUsernameChange = async (e) => {
		setUsernameValid(0);
		setForm((prev) => ({ ...prev, username: e.target.value }));

		if (abortController) {
			abortController.abort();
		}
		const newAbortController = new AbortController();
		setAbortController(newAbortController);
		try {
			const response = await axios.get(`/user/${e.target.value}`, {
				signal: newAbortController.signal,
			});
			if (response.data === "" || response.data.msg == "Not Found.") {
				setUsernameValid(1);
			} else {
				setUsernameValid(2);
			}
		} catch (err) {
			if (err.code === "ERR_CANCELED") {
				// console.log("A request has been canceled.");
			} else {
				// console.error(err);
			}
		}
	};
	const handlePasswordChange = (e) =>
		setForm((prev) => ({ ...prev, password: e.target.value }));
	const handleRepeatPasswordChange = (e) =>
		setForm((prev) => ({ ...prev, repeatedPassword: e.target.value }));

	const handleFormSubmit = async () => {
		try {
			await axios.post("/register", {
				username,
				password,
			});
			setdone(true);
		} catch (err) {
			// TO DO: Make a cancellation token
			console.error;
		}
	};
	return (
		<>
			<h1>Sign Up</h1>
			<hr />
			{done ? (
				<>
					<h3>Account Created!</h3>
					<br />
					<Link to="/">Login</Link>
				</>
			) : (
				<>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleFormSubmit();
						}}
					>
						<label htmlFor="username">
							Username
							{username.length === 0 ? (
								<small className="warning"> *</small>
							) : usernameValid == 2 ? (
								<small className="warning">
									{" "}
									Username already exists.
								</small>
							) : (
								""
							)}
						</label>
						<br />
						<input
							type="text"
							id="username"
							onChange={handleUsernameChange}
							className={
								username.length === 0
									? ""
									: usernameValid === 0
									? ""
									: usernameValid === 1
									? "valid"
									: "invalid"
							}
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
								<small className="warning">
									{" "}
									(Password doesn't match)
								</small>
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
						<button
							type="submit"
							disabled={usernameValid !== 1 || !repeatedPasswordValid}
						>
							Sign Up
						</button>
					</form>
					<br />
					<hr />
					<p>
						Already have an account? <Link to="/">Login</Link>
					</p>
					{/* TO DO: Make a status message section somewhere here. */}
				</>
			)}
		</>
	);
}
