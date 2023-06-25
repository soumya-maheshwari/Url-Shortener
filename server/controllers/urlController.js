const shortid = require("shortid");
const path = require("path");
const Url = require("../models/urlModel");
const { spawn } = require("child_process");

const generateShortUrl = async (req, res) => {
  try {
    const { longURL } = req.body;
    console.log(longURL);
    let url = await Url.findOne({ longURL });
    if (url) {
      return res.status(200).json({
        ...url._doc,
        // shortID: url.shortID,
        shortURL: `${req.baseUrl}/${url.shortID}`,
      });
    } else {
      url = await Url.create({
        longURL,
        shortID: shortid.generate(),
        // shortURL: `${req.baseUrl}/${url.shortID}`,
      });
      res.status(200).json({
        ...url._doc,
        shortURL: `${req.baseUrl}/${url.shortID}`,
      });
    }
    // console.log(shortID);
    console.log(shortURL);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};

// CLICKS ON SHORT URLS
const getShortURL = async (req, res) => {
  try {
    const { shortID } = req.params;
    let url = await Url.findOne({ shortID });
    if (!url) {
      return res.status(404).json({
        msg: "not a  valid url",
      });
    }
    url.clicks++;
    await url.save();
    res.redirect(url.longURL);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports = {
  generateShortUrl,
  getShortURL,
};
