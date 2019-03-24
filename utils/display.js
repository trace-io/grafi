const Table = require("cli-table");
const chalk = require("chalk");
const Spinner = require("clui").Spinner;
const config = require("../config");
const log = console.log;

const display = {};
display.table = (headers, data) => {
  const table = new Table({
    head: headers,
    ...config.table
  });
  table.push(...data);
  log(chalk.blue(table.toString()));
};
display.tree = data => {};
display.spinner = () => {
  let spinner = new Spinner(
    chalk.green("List project dependencies."),
    config.spinner.shape
  );
  // start pinner
  spinner.start();
  return spinner;
};

module.exports = display;
