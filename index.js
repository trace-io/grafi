#!/usr/bin/env node
"use strict";
const program = require("commander"),
  chalk = require("chalk"),
  pkg = require("./package.json"),
  log = console.log,
  core = require("./utils/").core;

program
  .version(pkg["version"])
  .option("-a, --analsyis", "show project analysis")
  .option("-l, --list", "show project dependencies list")
  .option("-s, --show [package] <required>", "show packgae dependencies")
  .parse(process.argv);

// grafi with no args
const start = async () => {
  if (!process.argv.slice(2).length) {
    // display grafi logo and version
    core.displayGrafi(pkg);
    log(program.help());
  } else {
    const files = core.isNodeProject(["package.json", "yarn.lock"]);
    if (files.includes("package.json")) {
      if (program.list) {
        const spinnerShape = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];
        const fileContent = JSON.parse(core.readFileContent("package.json"));
        if (fileContent.dependencies) {
          // deps
          await core.getDeps(fileContent.dependencies);
        }
        if (fileContent.devDependencies) {
          await core.getDeps(fileContent.devDependencies, "dev");
        }
      } else if (program.show) {
        await core.displayAnalysis(program.show);
      } else if (program.analsyis) {
        await core.displayAnalysis();
      }
    } else {
      log(chalk.blue("sorry no node project to analyze"));
    }
  }
};

start();
