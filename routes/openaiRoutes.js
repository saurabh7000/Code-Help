const express = require("express");
const {
  summaryController,
  codeOptimizer,
  roadmaps,
  help,
} = require("../controllers/openaiController");

const router = express.Router();

//route
router.post("/detectError", summaryController);
router.post("/CodeOptimizer", codeOptimizer);
router.post("/roadmaps", roadmaps);
router.post("/Help", help);

module.exports = router;
