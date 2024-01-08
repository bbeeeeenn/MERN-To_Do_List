import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ToDoList({ data }) {
	const navigate = useNavigate();
	const [waiting, setWaiting] = useState(false);

	const handleDoneClick = async (id) => {
		try {
			const response = await axios.get(`/todo/done/${id}`);
			if (response.status === 200) {
				setWaiting(true);
				window.location.reload();
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleDeleteClick = async () => {
		try {
		} catch (err) {
			console.error(err);
		}
	};

	return waiting ? (
		<h1 className="table-container">Wait...</h1>
	) : (
		<>
			<table border={1}>
				<caption>To-Do Lists</caption>
				<thead>
					<tr>
						<th colSpan={2}></th>
						<th
							className="set-add"
							colSpan={2}
							onClick={() => {
								navigate("add");
							}}
						>
							Add
						</th>
					</tr>
				</thead>
				<tbody>
					{data.userData?.todos.map(({ text, done, _id }) => (
						<tr key={_id}>
							<td className={`todo ${done ? "done" : ""}`}>{text}</td>
							<td
								className={`set set-done ${done ? "true" : ""}`}
								onClick={() => {
									handleDoneClick(_id);
								}}
							>
								{!done ? "Done" : "Undone"}
							</td>
							<td className="set set-edit">Edit</td>
							<td
								className="set set-delete"
								onClick={() => {
									handleDeleteClick(_id);
								}}
							>
								Delete
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
