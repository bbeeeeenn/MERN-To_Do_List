import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ServerError from "../../SmolComponents/ServerError";

export default function Add() {
	const navigate = useNavigate();
	const [todo, setTodo] = useState("");
	const [error, setError] = useState(false);

	const handleInputChange = (e) => {
		setTodo(e.target.value);
	};
	const handleFormSubmit = async () => {
		try {
			const response = await axios.post("/todo", { text: todo });
			window.location.href = "/home";
		} catch (err) {
			setError(true);
			console.error(err);
		}
	};

	const handleBackClick = () => {
		navigate("/home");
	};

	return error ? (
		<ServerError />
	) : (
		<>
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
				<label htmlFor="add">Add To-Do</label>
				<br />
				<input
					type="text"
					id="add"
					autoComplete="off"
					onChange={handleInputChange}
				/>
				<br />
				<button type="submit" disabled={todo.length <= 0}>
					Submit
				</button>
			</form>
		</>
	);
}
