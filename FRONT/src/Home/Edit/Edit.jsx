import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import ServerError from "../../SmolComponents/ServerError";

export default function Edit() {
	const navigate = useNavigate();
	const location = useLocation();
	const [input, setInput] = useState(location.state.text);
	const [error, setError] = useState(false);

	const handleBackClick = () => {
		navigate("/home");
	};

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleFormSubmit = async () => {
		try {
			const response = await axios.put(`/todo/${location.state.id}`, {
				text: input,
			});
			window.location.href = "/home";
		} catch (err) {
			console.error(err);
			setError(true);
		}
	};

	return error ? (
		<ServerError />
	) : (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleFormSubmit();
			}}
		>
			<button type="button" onClick={handleBackClick}>
				&lt; Back
			</button>
			<br />
			<br />
			<label htmlFor="add">Edit To-Do</label>
			<br />
			<input
				type="text"
				id="add"
				autoComplete="off"
				value={input}
				onChange={handleInputChange}
			/>
			<br />
			<button type="submit">Update</button>
		</form>
	);
}
