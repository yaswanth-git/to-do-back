const serverless = require('serverless-http');
const app = require('../../app.js');

app.use("/.netlify/functions/api", require("../../api/crud"));
module.exports.handler = serverless(app);