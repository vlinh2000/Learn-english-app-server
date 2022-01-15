var express = require("express");
const router = express.Router();

//controllers
const userController = require("../controllers/user.controller");

//middleware 
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.isAdmin, userController.getAll);
router.get("/:_id", userController.get);
router.post("/", authMiddleware.isAdmin, userController.add);
router.patch("/:_id", userController.patch);
router.delete("/:_id", authMiddleware.isAdmin, userController.delete);

module.exports = router;