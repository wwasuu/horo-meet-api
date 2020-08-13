"use strict";
const Sequelize = require("sequelize");
const sequelize = require("../lib/sequelize");

const MonthZodiacModel = require("./monthZodiac");
const SagesTableModel = require("./sagesTable")
const ElementModel = require("./element")
const TimeZodiacModel = require("./timeZodiac")
const CalendarModel = require("./calendar")

const MonthZodiac = MonthZodiacModel(sequelize, Sequelize);
const TimeZodiac = TimeZodiacModel(sequelize, Sequelize);
const SagesTable = SagesTableModel(sequelize, Sequelize);
const Element = ElementModel(sequelize, Sequelize);
const Calendar = CalendarModel(sequelize, Sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = {
  MonthZodiac,
  TimeZodiac,
  SagesTable,
  Element,
  Calendar,
  Op: Sequelize.Op,
  QueryTypes: Sequelize.QueryTypes,
  sequelize
};
