import { Router } from "express";
import UserData from "../Models/userData.js";

const router = Router();

// 1. GET To-Do Lists
router.get("/", async (req, res) => {
	const user = req.session.user;
	try {
		const userData = await UserData.findOne({ user: user });
	} catch (err) {}
	res.send(req.session.user);
});

export default router;
