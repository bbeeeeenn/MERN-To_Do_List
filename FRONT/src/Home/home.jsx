import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./home.css";

import ToDoList from "./ToDoLists/ToDoList.jsx";
import Add from "./Add/Add.jsx";
import Connecting from "../SmolComponents/Connecting.jsx";
import ServerError from "../SmolComponents/ServerError.jsx";

export default function Home() {
	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(false);
	const [data, setData] = useState({});
	const [error, setError] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get("/todo");
				setLoggedIn(true);
				setData(response.data);
			} catch (err) {
				if (err.response?.status === 401) {
					navigate("/");
					console.err(err);
				} else {
					setError(true);
					console.error(err);
				}
			}
		})();
	}, []);

	async function handleLogoutClick() {
		try {
			await axios.get("/logout");
			navigate(`/`);
		} catch (err) {
			console.error(err);
		}
	}

	return error ? (
		<ServerError />
	) : loggedIn ? (
		<>
			<h2 style={{ display: "inline" }}>{data.user} </h2>
			<button onClick={handleLogoutClick}>Logout</button>
			<br />
			<br />
			<div className="todo-container">
				{loggedIn ? (
					<Routes>
						<Route index element={<ToDoList data={data} />} />
						<Route path="/add" element={<Add />} />
					</Routes>
				) : (
					""
				)}
			</div>
		</>
	) : (
		<Connecting />
	);
}
