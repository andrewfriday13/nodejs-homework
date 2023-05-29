const express = require("express");

const { getAll, getById, add, updateById, updateFavorite, deleteById } = require("../controlers/contacts-controlers");
const { isValidId } = require("../middlewares");
const { validateBody } = require("../utils");
const { authenticate } = require("../middlewares");

const { schemas } = require("../validate-schema/schema");

const router = express.Router();

router.use(authenticate);

router.get("/", getAll);

router.get("/:id", isValidId, getById);

router.post("/", validateBody(schemas.addSchema), add);

router.put("/:id", isValidId, validateBody(schemas.addSchema), updateById);

router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), updateFavorite);

router.delete("/:id", isValidId, deleteById);

module.exports = router;
