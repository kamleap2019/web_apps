const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const { baseUrl } = require("../config/keys");

// Require validation
const validateBaseUrl = require("../validation/validateBaseUrl");
const validateLongUrl = require("../validation/validateLongUrl");

// Load db model
const Url = require("../models/Url");

// @route   POST /api/url/shorten
// @desc    Create short URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  // Check base url
  const { error, isBaseValid } = validateBaseUrl(baseUrl);
  if (!isBaseValid) {
    return res.status(401).json(error);
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  const { errors, isValid } = validateLongUrl(longUrl);
  if (isValid) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        // Return url if it's already exists in db
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        // Create new url
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        // Save to db
        await url.save();

        // Return url
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json(errors);
  }
});

module.exports = router;
