import { Router } from "express";

const router = Router();

// 1. GET To-Do Lists
router.get("/", async (req, res) => {
	res.send(req.session.user);
});

export default router;
