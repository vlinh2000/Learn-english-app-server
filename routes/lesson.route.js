var express = require("express");
const router = express.Router();
const upload = require("../multer/multer");
//controllers
const lessonController = require("../controllers/lesson.controller");

router.get("/", lessonController.getAll);
router.get("/:_id", lessonController.get);
router.post("/", upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), lessonController.add);
router.patch("/:_id", upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), lessonController.patch);
router.delete("/:_id", lessonController.delete);

module.exports = router;