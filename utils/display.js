const Table = require("cli-table");
const chalk = require("chalk");
const Spinner = require("clui").Spinner;
const config = require("../config");
const log = console.log;
const treeify = require("treeify");

const display = {};
display.table = (headers, data) => {
  const table = new Table({
    head: headers,
    ...config.table
  });
  table.push(...data);
  log(chalk.blue(table.toString()));
};
display.tree = data => {
  treeify.asTree(data);
};
display.spinner = (messgae = "") => {
  let spinner = new Spinner(chalk.green(messgae), config.spinner.shape);
  // start pinner
  spinner.start();
  return spinner;
};

module.exports = display;
