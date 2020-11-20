var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var cloudinary = require("cloudinary").v2;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var photosRouter = require("./routes/photos");

var app = express();

require("dotenv/config");

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
app.use("/api/users", usersRouter);
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

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

// cloudinary.uploader.upload("public/images/alex-grey-background.jpg", function (error, result) {
//   console.log(result, error);
// });

// cloudinary.api.resources(
//   function(error, result) {console.log(result, error); });

// cloudinary.search
//   .expression("folder:portfolio")
//   // .sort_by('public_id','desc')
//   // .with_field("tags")
  
//   // .aggregate('url')
//   .execute()
//   .then((result) => {
//     const arr = result.resources.map(data => data );
//     console.log(arr);
//   });

module.exports = app;
