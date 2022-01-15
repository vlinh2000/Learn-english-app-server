var express = require("express");
const router = express.Router();
const Upload = require("../multer/multer");
//controllers
const lessonController = require("../controllers/lesson.controller");

router.get("/", lessonController.getAll);
router.get("/:_id", lessonController.get);
router.post("/", Upload.fields(["audio", "image"]), lessonController.add);
router.patch("/:_id", Upload.fields(["audio", "image"]), lessonController.patch);
router.delete("/:_id", lessonController.delete);

module.exports = router;