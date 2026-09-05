const express = require("express");

const {
  protect
} = require("../middleware/authMiddleware");

const upload =
  require("../middleware/uploadMiddleware");

const {
  uploadDocument
} = require("../controllers/documentController");

const router = express.Router();

router.post(
  "/:id/upload",
  protect,
  upload.single("document"),
  uploadDocument
);

module.exports = router;