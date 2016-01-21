"use strict";

var _interopRequire = function (obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

module.exports = server;

var socketio = _interopRequire(require("socket.io"));

var semafor = _interopRequire(require("semafor"));

var os = _interopRequire(require("os"));

var http = _interopRequire(require("http"));

var express = _interopRequire(require("express"));

var path = _interopRequire(require("path"));

function server(port) {
  var logger = semafor();
  var app = express();
  var server = http.Server(app);
  var io = socketio(server);

  var public_path = path.join(__dirname, "..", "public");
  app.use(express["static"](public_path));

  var ifaces = os.networkInterfaces();
  var en1 = ifaces.en1;
  var local_ip = undefined;
  for (var i in en1) {
    var addr = en1[i];
    if (addr.family != "IPv4") continue;
    local_ip = ["http", addr.address].join("://");
    break;
  }
  var namespace = [local_ip, port].join(":");

  io.on("connection", function (socket) {
    console.log("connection");
    var _card = {};
    socket.on("greetings", function (card) {
      console.log("greetings");
      _card = card;
      io.emit("greetings", card);
    });
    socket.on("dump", function (log) {
      console.log("dump");
      io.emit("dump", log);
    });
    socket.on("disconnect", function () {
      console.log("disconnect");
      io.emit("goodbye", _card);
    });
  });

  server.listen(port, function () {
    logger.ok("Server running on " + namespace);
  });
}