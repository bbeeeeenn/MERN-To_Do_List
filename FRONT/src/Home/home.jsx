import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
				if (err.response.status === 401) {
					navigate("/?loggedIn=false");
					console.log(err);
				} else {
					console.error(err);
				}
			}
		})();
	}, []);

	return loggedIn ? <ToDoList user={data} /> : "";
}

function ToDoList({ user }) {
	const navigate = useNavigate();
	async function handleLogoutClick() {
		try {
			const response = await axios.get("/logout");
			navigate(`/?loggedIn=false`);
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<h2 style={{ display: "inline" }}>{user} </h2>
			<button onClick={handleLogoutClick}>Logout</button>
			<br />
			<br />
			<h1>To-Do Lists:</h1>
		</>
	);
}
