const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  http = require("http").Server(app),
  db = require("./db"),
  Counter = require("./counter/counter.model"),
  URL = require("./url/url.model"),
  router = require("./router"),
  port = process.env.PORT || 8080;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use("/", router);

const start = async () => {
  try {
    await db.connect();
    console.log("connected!");
    URL.deleteMany({}, function() {
      console.log("URL collection removed");
    });
    Counter.deleteMany({}, function() {
      console.log("Counter collection removed");
      var counter = new Counter({ _id: "url_count", count: 10000 });
      counter.save(function(err) {
        if (err) return console.error(err);
        console.log("counter inserted");
      });
    });

    http.listen(port, function() {
      console.log("Server Started. Listening on *:" + port);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  start
};
