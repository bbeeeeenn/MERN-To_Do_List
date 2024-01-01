import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			navigate("/");
		}, 2000);
	}, []);
	return (
		<>
			<h1>Not Found</h1>
			<small>Navigating back to homepage.</small>
		</>
	);
}
