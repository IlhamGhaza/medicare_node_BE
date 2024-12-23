const HOST = "192.168.1.12"; // IP address of the server or localhost
const PORT = 3000; // Port number of the server
const BASE_URL = `http://${HOST}:${PORT}`;
console.log("Sever run at : " + BASE_URL);

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const cors = require("cors");
const fs = require("fs");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: BASE_URL,
    methods: ["GET", "POST"],
  },
});

const serverPort = PORT;
const user_socket_connect_list = [];

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const corsOptions = {
  origin: BASE_URL,
};

app.use(cors(corsOptions));

fs.readdirSync("./controllers").forEach((file) => {
  if (file.substr(-3) == ".js") {
    route = require("./controllers/" + file);
    route.controller(app, io, user_socket_connect_list);
  }
});

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

module.exports = app;

server.listen(serverPort);

console.log("Server Start : " + serverPort);

Array.prototype.swap = (x, y) => {
  const b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
};

Array.prototype.insert = (index, item) => {
  this.splice(index, 0, item);
};

Array.prototype.replace_null = (replace = '""') => {
  return JSON.parse(JSON.stringify(this).replace(/null/g, replace));
};

String.prototype.replaceAll = (search, replacement) => {
  const target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
