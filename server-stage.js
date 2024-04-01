/**
 * @author gdiao:
 * this is used for testing purpose only, as for production
 * mode, it's recommend to deploy .dist in Apache or other Http server as static file.
 *
 **/
import chalk from "chalk";
import express from "express";
//const chalk = import("chalk");
//const express = require("express");
const app = express();

const log = console.log;

const PORT = 8011;
const PUBLIC_PATH = "/";
log("Trying to start http service @ local:" + chalk.blue(PORT));
app.use(PUBLIC_PATH, express.static("dist"));

app.get("/", function (req, res) {
  res.send("Copyright@Ultrabroad Beijing Ltd, Co.");
});

const server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  log(
    `Server is running at http://${chalk.blue(host)}:${chalk.blue(
      port
    )}${PUBLIC_PATH}`
  );
});
