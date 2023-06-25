const express = require("express");
const router = express.Router();

const { generateShortUrl } = require("../controllers/urlController");

router.get("/:id", (req, res) => {});
router.post("/", generateShortUrl);

module.exports = router;
