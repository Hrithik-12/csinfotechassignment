const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.js");
const { uploadAndDistribute, getDistributions } = require("../controllers/distributionController.js");

router.post("/upload", upload.single("file"), uploadAndDistribute);
router.get("/", getDistributions);

module.exports = router;
