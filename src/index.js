if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const server = require("./server");

// initialize the DB and start the server
server.start();
