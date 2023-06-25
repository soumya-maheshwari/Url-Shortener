const express = require("express");
// const connectDB = require("./DbConnect");
const mongoose = require("mongoose");

const urlRoute = require("./routes/urlRoute");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Port = process.env.PORT || 5000;

//enables server to understand json requests
app.use(express.json());

//makes server allow cross-origin
app.use(cors({ origin: true }));

app.use(express.urlencoded({ extended: false }));

// Connection to DataBase

// connectDB();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("helllooooo");
});

app.listen(Port, () => {
  console.log(`server started at port ${Port}`);
});

// routes

app.use("/url", urlRoute);
