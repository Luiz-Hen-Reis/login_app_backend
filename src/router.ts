import express from "express";
import { authController } from "./controllers/authController";
import { ensureAuth } from "./middlewares/auth";
import { usersController } from "./controllers/usersController";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.put("/user/current", ensureAuth, usersController.update);

export { router };
