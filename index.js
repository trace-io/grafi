#!/usr/bin/env node

'use strict';
const program = require('commander');
const chalk = require('chalk');
const pkg = require('./package.json');
const log = console.log;
const core = require('./utils/').core;
const packages = require('./utils').packages;
const snapshots = require('./utils').snapshots;
const display = require('./utils').display;

// grafi cli
program
	.version(pkg['version'], '-v, --version')
	.option('-a, --analysis', 'show project analysis')
	.option('-l, --list [packages_type]', 'show project dependencies list')
	.option('-t, --take [snapshot_name]', 'take a snapshot of the current dependencies')
	.option('--apply [snapshot_name]', 'install dependencies from snapshot to anoter project')
	.option('--snapshots [snapshot_name]', 'list or show details of all taken snapshots')
	.parse(process.argv);

// grafi with no args
(async () => {
	try {
		const args = process.argv.slice(2);

		if (args.length) {
			const isNodeProject = await packages.isNpmProject();
			if (isNodeProject) {
				if (program.list) {
					switch (program.list) {
						case 'dev':
							const devDependencies = await packages.getAll('devDependencies');
							await core.displayDevelopmentDependencies(devDependencies, 'dev');
							break;
						case 'prod':
							const dependencies = await packages.getAll('dependencies');
							await core.displayProductionDependencies(dependencies, 'prod');
							break;
						default:
							const deps = await packages.getAll();
							await core.displayProductionAndDevelopmentDependencies(deps);
							break;
					}
				} else if (program.analysis) {
					await core.displayAnalysis();
				} else if (program.take) {
					await snapshots.takeSnapshot(program.take);
				} else if (program.snapshots) {
					await snapshots.displaySnapshots(program.snapshots);
				} else if (program.apply) {
					await snapshots.applySnapShot(program.apply);
				}
			} else {
				display.message('error', 'make sure, you run command on node project!');
			}
		} else {
			core.displayGrafiLogo(pkg);
			log(program.help());
		}
	} catch (ex) {
		console.error(ex);
		core.displayErrorMessage();
	}
})();
