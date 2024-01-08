import { Router } from "express";
import UserData from "../Models/userData.js";

const router = Router();

// 1. GET To-Do Lists
router.get("/", async (req, res) => {
	try {
		const user = req.session.user;
		const userData = await UserData.findOne({ user: user });
		res.json({
			user,
			userData,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Something went wrong." });
	}
});

// 2. POST
router.post("/", async (req, res) => {
	try {
		const user = req.session.user;
		const userData = await UserData.findOne({ user: user });
		if (!userData) {
			const created = new UserData({
				user,
				todos: [req.body],
			});
			await created.save();
			res.json({
				msg: "Created.",
				created,
			});
		} else {
			userData.todos.push(req.body);
			await userData.save();
			res.json({
				msg: "Created.",
				userData,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: "Something went wrong." });
	}
});

// 3. PUT
router.put("/:id", async (req, res) => {
	try {
		const { user } = req.session;
		const { id } = req.params;

		const userData = await UserData.findOne({ user });

		const itemIndex = userData.todos.findIndex(
			(item) => item._id.toString() === id
		);
		if (itemIndex == -1) {
			return res.status(404).json({
				msg: "Index not found.",
			});
		}

		userData.todos[itemIndex].text = req.body.text;
		await userData.save();
		res.json({
			msg: "Updated",
			userData,
		});
	} catch (err) {
		res.status(500).json({ msg: "Something went wrong." });
	}
});

// 4. DONE
// To toggle "done"
router.get("/done/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { user } = req.session;

		const userData = await UserData.findOne({ user });

		if (!userData) {
			return res.status(404).json({ msg: `User ${user} not found.` });
		}
		const todoItemIndex = userData.todos.findIndex(
			(item) => item._id.toString() === id
		);
		if (todoItemIndex == -1) {
			return res.status(404).json({ msg: `Item ${id} not found` });
		}

		const itemDoneStatus = userData.todos[todoItemIndex].done;

		userData.todos[todoItemIndex].done = !itemDoneStatus;
		await userData.save();
		res.json({ msg: "Success" });
	} catch (err) {
		res.status(500).json({ msg: "Something went wrong." });
	}
});

// 5. DELETE
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { user } = req.session;

		const userData = await UserData.findOne({ user });
		if (!userData) {
			return res.status(404).json({ msg: `User ${user} not found.` });
		}
		const todoItemIndex = userData.todos.findIndex(
			(item) => item._id.toString() === id
		);
		if (todoItemIndex == -1) {
			return res.status(404).json({ msg: `Item ${id} not found` });
		}

		const deleted = userData.todos.splice(todoItemIndex, 1);
		userData.save();
		res.json({ msg: "Success.", deleted_item: deleted });
	} catch (error) {
		res.status(500).json({ msg: "Something went wrong." });
	}
});

export default router;
