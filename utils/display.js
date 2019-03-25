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

display.message = (type, message) => {
  switch (type) {
    case 'info':
      log(`${chalk.blue('[info]')} ${chalk.green(message)}`)
      break;
    case 'error':
      log(`${chalk.red('[error]')} ${chalk.green(message)}`)
      break;
    case 'warning':
      log(`${chalk.yellow('[error]')} ${chalk.green(message)}`)
      break;
    case 'success':
      log(`${chalk.grey('[error]')} ${chalk.green(message)}`)
      break;
    default:
      log(message)
      break;
  }

}
module.exports = display;