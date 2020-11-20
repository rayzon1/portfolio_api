var express = require("express");
var router = express.Router();
var cloudinary = require("cloudinary").v2;

require("dotenv/config");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/* GET home page. */
router.get("/", (req, res, next) => {
  const searchQuery = req.query.q;
  cloudinary.search
    .expression(searchQuery)
    .execute()
    .then((result) => {
      const arr = result.resources.map((data) => data);
      res.status(200).json(result);
    });
});

module.exports = router;
