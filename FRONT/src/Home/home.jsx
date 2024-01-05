import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

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
				console.log(response);
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
			<h2 style={{ display: "inline" }}>{data.user} </h2>
			<button onClick={handleLogoutClick}>Logout</button>
			{loggedIn ? <ToDoList data={data} /> : ""}
		</>
	);
}

function ToDoList({ data }) {
	return (
		<>
			<br />
			<br />
			<div className="table-container">
				<table border={1}>
					<caption>To-Do Lists</caption>
					<thead>
						<tr>
							<th colSpan={2}></th>
							<th
								className="set-add"
								style={{ height: "30px" }}
								colSpan={2}
							>
								Add
							</th>
						</tr>
					</thead>
					<tbody>
						{data.userData?.todos.map(({ text, done, _id }) => (
							<tr key={_id}>
								<td className={`todo ${done ? "done" : ""}`}>{text}</td>
								<td className="set set-done">Done</td>
								<td className="set set-edit">Edit</td>
								<td className="set set-delete">Delete</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
