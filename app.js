const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const feedRouter = require("./routes/feed");

const app = express();

// app.use(bodyParser.urlencoded()) // x-wwww-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRouter);

mongoose
  .connect(
    "mongodb+srv://Tiskae:kispY5G7boRv24Zu@cluster0.irqruor.mongodb.net/messages?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080, () => console.log("Listening on 8080"));
  })
  .catch(console.error);
