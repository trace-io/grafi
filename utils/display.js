const Table = require('cli-table');
const chalk = require('chalk');
const Spinner = require('clui').Spinner;
const config = require('../config');
const { log, error, warn, info } = console;
const treeify = require('treeify');

const display = {};

display.table = (headers, data) => {
	const table = new Table({
		head: headers,
		...config.table
	});
	table.push(...data);
	log(chalk.blue(table.toString()));
};

display.tree = (data) => {
	treeify.asTree(data);
};

display.spinner = (messgae = '') => {
	let spinner = new Spinner(chalk.green(messgae), config.spinner.shape);
	spinner.start();
	return spinner;
};

display.message = (type, message) => {
	switch (type) {
		case 'info':
			info(`${chalk.bgCyan.black.bold(' INFO ')} ${chalk.grey(message)}`);
			break;
		case 'error':
			error(`${chalk.bgRed.black.bold(' ERROR ')} ${chalk.grey(message)}`);
			break;
		case 'warning':
			warn(`${chalk.bgYellow.black.bold(' WARN ')} ${chalk.grey(message)}`);
			break;
		case 'success':
			info(`${chalk.bgGreen.black.bold(' DONE ')} ${chalk.grey(message)}`);
			break;
		default:
			log(message);
			break;
	}
};
module.exports = display;
