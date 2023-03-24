import { Router } from "express";
import { addUser, getAllUsers, getUser } from "../controller/userController.js";

const router = new Router();

router.route("/").get(getAllUsers).post(addUser);

router.route("/:id").get(getUser);

export default router;
