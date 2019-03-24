const chalk = require("chalk");
const exec = require("util").promisify(require("child_process").exec);
const Spinner = require("clui").Spinner;
const Table = require("cli-table");
const figlet = require("figlet");
const treeify = require("treeify");
const log = console.log;
const display = require("./display");

const core = {};
core.displayGrafiLogo = async pkg => {
  log(
    chalk.blue(
      figlet.textSync("Grafi", {
        horizontalLayout: "full"
      })
    )
  );
  log(chalk.red(`Grafi version ${pkg["version"]}`));
};

core.displayDeps = async (depsObj, type = "prod") => {
  const spinner = display.spinner();
  const deps = Object.keys(depsObj).map(package => {
    const version =
      depsObj[package] !== undefined && depsObj[package] !== ""
        ? depsObj[package]
        : "×.×.×";
    package = type === "prod" ? `🚀  ${package}` : `🚧  ${package}`;
    return [package, `${version}`];
  });
  display.table(["package", "version"], deps);
  spinner.stop();
};

core.displayProductionDependencies = async deps => {
  log(
    `${chalk.blue("[Grafi Info]")} ${chalk.green(
      "🚀  Production Dependencies"
    )}`
  );
  core.displayDeps(deps);
};

core.displayDevelopmentDependencies = async deps => {
  log(
    `${chalk.blue("[Grafi Info]")} ${chalk.green(
      `🚧  Development Dependencies`
    )}`
  );
  core.displayDeps(deps, "dev");
};

core.displayProductionAndDevelopmentDependencies = async depsObj => {
  log(
    `${chalk.blue("[Grafi Info]")} ${chalk.green(
      "🚀  Production Dependencies"
    )} ${chalk.red("🚧  Development Dependencies")}`
  );
  const deps = Object.keys(depsObj).map(key => {
    return Object.keys(depsObj[key]).map(package => {
      const version =
        depsObj[key][package] !== undefined && depsObj[key][package] !== ""
          ? depsObj[key][package]
          : "×.×.×";
      package =
        key === "dependencies"
          ? chalk.green(`🚀   ${package}`)
          : chalk.red(`🚧   ${package}`);
      return [package, version];
    });
  });
  const spinner = display.spinner();
  // const depstable = new Table({
  //   // defaultValue: `×.×.×`,
  //   // errorOnNull: false,
  //   chars: {
  //     mid: "",
  //     "left-mid": "",
  //     "mid-mid": "",
  //     "right-mid": ""
  //   },
  //   head: ["package", "version"]
  // });
  // depstable.push(...[...deps[0], ...deps[1]]);
  // log(chalk.blue(depstable.toString()));
  display.table(["package", "version"], [...deps[0], ...deps[1]]);
  spinner.stop();
};

core.getOutdated = async package => {
  const msg =
    package === "" || package === undefined
      ? "Analyze packages to get outdataed."
      : `Analyzing ${package}`;
  const spinner = display.spinner();
  try {
    const outdated = await exec("npm outdated --json");
    if (outdated.stdout) {
      return JSON.parse(outdated.stdout);
    }
    return {};
  } catch (ex) {
    if (ex.stdout) {
      return JSON.parse(ex.stdout);
    } else {
      log(chalk.red("some thing wrong happend"));
    }
  } finally {
    spinner.stop();
  }
};

core.displayAnalysis = async (package = "") => {
  const deps = await core.getOutdated(package);
  const names = Object.keys(deps);
  if (package === "") {
    const required_table = names.map(name => [
      deps[name].current !== deps[name].latest
        ? chalk.red("× " + name)
        : chalk.green(name),
      deps[name].current,
      deps[name].latest
    ]);
    display.table(["  package", "version", "latest"], required_table);
  } else {
    const required_package = deps[package];
    log(chalk.green(package));
    log(chalk.blue(treeify.asTree(required_package, true)));
  }
};

module.exports = core;
