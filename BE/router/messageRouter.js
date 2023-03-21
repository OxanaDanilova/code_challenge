import { Router } from "express";
import { createMessage } from "../controller/messageController.js";

const router = new Router();

router.route("/").post(createMessage);

//router.route("/:id").get(getUser);

export default router;