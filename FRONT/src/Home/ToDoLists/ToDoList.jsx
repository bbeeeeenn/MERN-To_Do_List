import axios from "axios";
import { useState } from "react";

export default function ToDoList({ data }) {
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

	return waiting ? (
		<h1 className="table-container">Wait...</h1>
	) : (
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
								<td
									style={done ? { color: "red" } : {}}
									className="set set-done"
									onClick={() => {
										handleDoneClick(_id);
									}}
								>
									{!done ? "Done" : "Undone"}
								</td>
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
