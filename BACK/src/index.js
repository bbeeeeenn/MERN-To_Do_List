import express, { json } from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import session from "express-session";
import auth from "./Routes/auth.js";
import todo from "./Routes/todo.js";
import "dotenv/config.js";

const app = express();
app.use(json());
app.use(
	cors({
		credentials: true,
		origin: process.env.CORS_ORIGIN,
	})
);

app.set("trust proxy", 1);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
		cookie: process.env.LOCAL
			? {}
			: {
					domain: process.env.COOKIE_DOMAIN,
					secure: true,
					sameSite: "none",
					path: "/",
			  },
	})
);

app.use((req, res, next) => {
	console.log(
		`Handling ${req.method} ${req.url} from ${
			req.ip
		} ${new Date().toTimeString()}`
	);
	// res.cookie("test", "test", {
	// 	domain: process.env.COOKIE_DOMAIN,
	// 	sameSite: "none",
	// 	secure: true,
	// });
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
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connected!");
		app.listen(PORT, () => {
			console.log(`App is listening on port ${PORT}.`);
		});
	} catch (err) {
		console.error(err);
	}
}

startApp();
