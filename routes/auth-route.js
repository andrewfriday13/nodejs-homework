const express = require("express");

const router = express.Router();

const { validateBody } = require("../utils");

const authControlers = require("../controlers/auth-controlers");
const { register } = authControlers;
const schema = require("../validate-schema/schema");
const { registerSchema } = schema;

router.post("/register", validateBody(registerSchema), register);
