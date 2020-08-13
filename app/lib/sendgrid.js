const sendgrid = require("@sendgrid/mail");
const CONFIG = require("../config");

sendgrid.setApiKey(CONFIG.SENDGRID_API_KEY);

module.exports = sendgrid;
