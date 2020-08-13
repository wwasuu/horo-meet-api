const express = require("express");
const expressStatusMonitor = require("express-status-monitor");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const calculate = require('./app/route/calculate')

const app = express();

app.use(expressStatusMonitor());

app.use(
  compression({
    threshold: 512,
  })
);

app.use(cors());

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

const logingFormat = process.env.NODE_ENV === "dev" ? "dev" : "combined";
app.use(morgan(logingFormat));

app.use('/api/calculate', calculate)

// assume 404 since no middleware responded
app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "ไม่พบ",
    url: req.originalUrl,
  });
});

module.exports = app;
