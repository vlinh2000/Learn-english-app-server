var express = require("express");
const router = express.Router();

//controllers
const wordController = require("../controllers/word.controller");

router.get("/", wordController.getAll);
router.get("/:_id", wordController.get);
router.post("/", wordController.add);
router.patch("/:_id", wordController.patch);
router.delete("/:_id", wordController.delete);

module.exports = router;