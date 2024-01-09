import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import auth from "./Routes/auth.js";
import todo from "./Routes/todo.js";

const app = express();
app.use(json());
app.use(
	cors({
		credentials: true,
		origin: process.env.CORS_ORIGIN || "http://localhost:5173",
	})
);
app.use(
	session({
		secret: "spaghetti",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: true,
			sameSite: "none",
			domain: ".netlify.app",
		},
	})
);

app.use((req, res, next) => {
	console.log(
		`Handling ${req.method} ${req.url} from ${
			req.ip
		} ${new Date().toTimeString()}`
	);
	next();
});

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
		await mongoose.connect(
			process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todolist"
		);
		console.log("Connected!");
		app.listen(PORT, () => {
			console.log(`App is listening on port ${PORT}`);
		});
	} catch (err) {
		console.error(err);
	}
}

startApp();
