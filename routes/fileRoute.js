const express = require("express");
const router = express.Router();

const { createFile, getAllFile } = require("../controllers/fileController");
const uploadFile = require("../controllers/uploadController");

router.route("/").get(getAllFile);
router.route("/create").post(createFile);
router.route("/upload").post(uploadFile);

module.exports = router;
