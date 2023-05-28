const express = require("express");

const router = express.Router();
const { authenticate } = require("../middlewares");

const { validateBody } = require("../utils");

const authControlers = require("../controlers/auth-controlers");
const { register, login, getCurrentUser, logOut } = authControlers;

const { schemas } = require("../validate-schema/schema");
const { registerSchema, loginSchema } = schemas;

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrentUser);
router.post("/logout", authenticate, logOut);

module.exports = router;
