const express = require("express");

const router = express.Router();
const { authenticate, upload } = require("../middlewares");

const { validateBody } = require("../utils");

const authControlers = require("../controlers/auth-controlers");
const { register, login, getCurrentUser, logOut, updateAvatar } = authControlers;

const { schemas } = require("../validate-schema/schema");
const { registerSchema, loginSchema } = schemas;

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrentUser);
router.post("/logout", authenticate, logOut);

router.patch("/avatar", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
