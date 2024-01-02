import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import auth from "./Routes/auth.js";
import todo from "./Routes/todo.js";

const app = express();
app.use(json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(
	session({
		secret: ["spaghetti", "zenith", "dio", "senku"],
		resave: false,
		saveUninitialized: false,
	})
);

// Routes
app.use("/", auth);

app.use((req, res, next) => {
	if (!req.session.user) {
		return res.status(401).json({
			msg: "You're not logged-in.",
		});
	}
	next();
});

app.use("/todo", todo);

app.all("*", (req, res) => {
	res.json({ msg: "Not Found." });
});

async function startApp(PORT = 3000) {
	console.log("Connecting to the database.");
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/todolist");
		console.log("Connected!");
		app.listen(PORT, () => {
			console.log(`App is listening on port ${PORT}`);
		});
	} catch (err) {
		console.error(err);
	}
}

startApp();
