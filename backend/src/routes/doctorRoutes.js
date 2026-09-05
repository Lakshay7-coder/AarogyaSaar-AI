const express = require("express");

const {
  protect,
  authorize
} = require("../middleware/authMiddleware");

const {
  getDashboard,
  verifyCase,
  updateSummary
} = require("../controllers/doctorController");

const router = express.Router();

router.use(
  protect,
  authorize("doctor", "admin")
);

router.get(
  "/dashboard",
  getDashboard
);

router.put(
  "/cases/:id/summary",
  updateSummary
);

router.put(
  "/cases/:id/verify",
  verifyCase
);

module.exports = router;