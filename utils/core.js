const fs = require("fs"),
  path = require("path"),
  chalk = require("chalk"),
  exec = require("util").promisify(require("child_process").exec),
  Spinner = require("clui").Spinner,
  Table = require("cli-table"),
  figlet = require("figlet"),
  treeify = require("treeify"),
  log = console.log;

const spinnerShape = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"];

const core = {};
core.displayGrafiLogo = async pkg => {
  log(chalk.blue(figlet.textSync("Grafi", {
    horizontalLayout: "full"
  })));
  log(chalk.red(`Grafi version ${pkg["version"]}`));
};
core.displayDeps = async (depsObj) => {
  const deps = Object.keys(depsObj).map(package => {
    const version = depsObj[package] !== undefined && depsObj[package] !== '' ?
      depsObj[package] : '×.×.×';
    return [package, version];
  });
  let spinner = new Spinner(
    chalk.green("List project dependencies."),
    spinnerShape
  );
  // start pinner
  spinner.start();
  const depstable = new Table({
    defaultValue: `×.×.×`,
    errorOnNull: false,
    chars: {
      mid: "",
      "left-mid": "",
      "mid-mid": "",
      "right-mid": ""
    },
    head: ["package", "version"]
  });
  depstable.push(...deps);
  log(chalk.blue(depstable));
  // stop spinner
  spinner.stop();
};

core.displayProductionDependencies = async (deps) => {
  log(`${chalk.blue('[Grafi Info]')} ${chalk.green(`🚀 Production Dependencies`)}`);
  core.displayDeps(deps);
}
core.displayDevelopmentDependencies = async (deps) => {
  log(`${chalk.blue('[Grafi Info]')} ${chalk.green(`🚧 Development Dependencies`)}`);
  core.displayDeps(deps);
}
core.displayProductionAndDevelopmentDependencies = async (depsObj) => {
  log(`${chalk.blue('[Grafi Info]')} ${chalk.green(`🚀Production Dependencies`)} ${chalk.red('🚧 Development Dependencies')}`);
  const deps = Object.keys(depsObj).map(key => {
    return Object.keys(depsObj[key]).map(package => {
      const version = depsObj[key][package] !== undefined && depsObj[key][package] !== '' ? depsObj[key][package] : '×.×.×';
      package = key === 'dependencies' ? chalk.green(`🚀 ${package}`) : chalk.red(`🚧 ${package}`);
      return [package, version];
    });
  })

  let spinner = new Spinner(
    chalk.green("List project dependencies."),
    spinnerShape
  );
  // start pinner
  spinner.start();
  const depstable = new Table({
    defaultValue: `×.×.×`,
    errorOnNull: false,
    chars: {
      mid: "",
      "left-mid": "",
      "mid-mid": "",
      "right-mid": ""
    },
    head: ["package", "version"]
  });
  depstable.push(...[...deps[0], ...deps[1]]);
  log(chalk.blue(depstable));
  // stop spinner
  spinner.stop();
};


core.analyze = async package => {
  const msg = package === "" ? "Analyze packages to get outdataed." : `Analyzing ${package}`;
  spinner = new Spinner(chalk.green(msg), spinnerShape);
  try {
    spinner.start();
    const outdated = await exec("npm outdated --json");
    return JSON.parse(outdated.stdout);
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
  const deps = await core.analyze(package);
  const names = Object.keys(deps);
  if (package === "") {
    const required_table = names.map(name => [
      deps[name].current !== deps[name].latest ?
      chalk.red("× " + name) :
      chalk.green(name),
      deps[name].current,
      deps[name].latest
    ]);
    const table = new Table({
      defaultValue: `×.×.×`,
      errorOnNull: false,
      chars: {
        mid: "",
        "left-mid": "",
        "mid-mid": "",
        "right-mid": ""
      },
      head: ["  package", "version", "latest"]
    });
    table.push(...required_table);
    log(chalk.blue(table));
  } else {
    const required_package = deps[package];
    log(chalk.green(package));
    log(chalk.blue(treeify.asTree(required_package, true)));
  }
};

module.exports = core;