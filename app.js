const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cloudinary = require("cloudinary").v2;

const indexRouter = require("./routes/index");
const photosRouter = require("./routes/photos");

const app = express();

require("dotenv/config");

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use("/", indexRouter);
app.use("/api/photos", photosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// CONNECT TO CLOUDINARY AND UPLOAD ASSETS

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// cloudinary.uploader.upload("public/images/alex-grey-background.jpg", function (error, result) {
//   console.log(result, error);
// });

// cloudinary.api.resources(function (error, result) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(result.resources);
//   }
// });

// cloudinary.search
//   .expression("folder:portfolio")
//   .sort_by("public_id", "desc")
//   .with_field("tags")
//   .aggregate("url")
//   .execute()
//   .then((result) => {
//     const arr = result.resources.map((data) => data);
//     console.log(arr);
//   });

module.exports = app;
