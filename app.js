const express = require("express");
const http = require("http");

const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");

const authRouter = require("./routes/auth");
const feedRouter = require("./routes/feed");

const app = express();
const server = new http.createServer(app);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + " " + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()) // x-wwww-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
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

app.use("/auth", authRouter);
app.use("/feed", feedRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const { message, data } = error;

  res.status(status).json({ message, data });
});

mongoose
  .connect(
    "mongodb+srv://Tiskae:kispY5G7boRv24Zu@cluster0.irqruor.mongodb.net/messages?retryWrites=true&w=majority"
  )
  .then((result) => {
    server.listen(8080, () => {
      console.log("Listening on http://localhost:8080");
      const io = require("./socket").init(server);

      io.on("connection", (socket) => {
        console.log("Client connected!");

        socket.on("disconnect", () => {
          console.log("Client has disconnected!");
        });
      });
    });
  })
  .catch(console.error);
