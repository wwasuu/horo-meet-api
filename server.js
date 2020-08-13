const app = require("./app");

let server;
const port = process.env.PORT || 8080;

server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

// Graceful Shutdown
const gracefulShutdown = () => {
  console.info(
    "Got SIGTERM. Graceful shutdown start",
    new Date().toISOString()
  );
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit();
  });
  // if after
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit();
  }, 10 * 1000);
};

// listen for TERM signal .e.g. kill
process.on("SIGTERM", gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on("SIGINT", gracefulShutdown);
