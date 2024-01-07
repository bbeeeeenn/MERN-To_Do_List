import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

import ToDoList from "./ToDoLists/ToDoList.jsx";
import Connecting from "../SmolComponents/Connecting.jsx";

export default function Home() {
	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(false);
	const [data, setData] = useState({});

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
					navigate("/");
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

	return loggedIn ? (
		<>
			<h2 style={{ display: "inline" }}>{data.user} </h2>
			<button onClick={handleLogoutClick}>Logout</button>
			{loggedIn ? <ToDoList data={data} /> : ""}
		</>
	) : (
		<Connecting />
	);
}
