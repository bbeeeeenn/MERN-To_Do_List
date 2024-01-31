import serverless from "serverless-http";
import express, { json } from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import auth from "./Routes/auth.js";
import todo from "./Routes/todo.js";
import "dotenv/config.js";

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(json());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
		}),
	})
);

// Routes
app.use("/api", auth);
app.use((req, res, next) => {
	if (!req.session.user) {
		return res.status(401).json({
			msg: "You're not logged-in.",
		});
	}
	next();
});
app.use("/api/todo", todo);
app.all("/api/*", (req, res) => {
	res.json({ msg: "Not Found." });
});

export const handler = serverless(app);
