import { Router } from "express";
import { hashSync, compareSync, genSaltSync } from "bcrypt";
import User from "../Models/user.js";

const router = Router();

// 1. Status
router.get("/status", async (req, res) => {
	res.json({
		loggedIn: req.session.user ? true : false,
		user: req.session.user || null,
	});
});

// 2. Users
router.get("/user/:username", async (req, res) => {
	try {
		if (req.params.username.toLowerCase === "all") {
			return res.send(await User.find({}, { __v: 0 }));
		} else {
			res.send(await User.findOne({ username: req.params.username }));
		}
	} catch (err) {
		res.status(500).json({ msg: "Something went wrong." });
	}
});

// 3. Register
router.post("/register", async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ msg: "Username and Password required." });
	} else if (password < 5) {
		return res
			.status(400)
			.json({ msg: "Password must be atleast 5 characters long." });
	}
	try {
		if (await User.findOne({ username })) {
			return res.status(409).json({ msg: "Username already exists." });
		} else {
			await User.create({
				username: username,
				password: hashSync(password, genSaltSync()),
			});
			res.json({ msg: "User created." });
		}
	} catch (err) {
		res.status(500).json({ msg: "Something went wrong." });
	}
});

// 4. Login
router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ msg: "Username and Password required." });
	}
	try {
		const foundUser = await User.findOne({ username: username });
		if (!foundUser) {
			return res.status(404).json({ msg: "Username doesn't exists." });
		} else if (!compareSync(password, foundUser.password)) {
			return res.status(401).json({ msg: "Incorrect password." });
		} else {
			req.session.user = username;
			res.json({ msg: "Logged in successfully." });
		}
	} catch (err) {
		res.status(500).json({ msg: "Something went wrong." });
	}
});

// router.use((req, res, next) => {
// 	if (!req.session.user) {
// 		return res.status(401).json({
// 			msg: "You're not logged-in.",
// 		});
// 	}
// 	next();
// });

// 5. Logout
router.get("/logout", async (req, res) => {
	req.session.user = null;
	res.json({ msg: "Logged-out successfully." });
});

export default router;
