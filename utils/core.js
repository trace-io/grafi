const chalk = require("chalk");
const figlet = require("figlet");
const treeify = require("treeify");
const log = console.log;
const display = require("./display");
const npm = require("./npm-commander");
const packages = require("./packages");

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
  const spinner = display.spinner("List project dependencies.");
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
      `🚀  (${Object.keys(deps).length}) Production Dependencies`
    )}`
  );
  core.displayDeps(deps);
};

core.displayDevelopmentDependencies = async deps => {
  log(
    `${chalk.blue("[Grafi Info]")} ${chalk.green(
      `🚧  (${Object.keys(deps).length}) Development Dependencies`
    )}`
  );
  core.displayDeps(deps, "dev");
};

core.displayProductionAndDevelopmentDependencies = async depsObj => {
  log(
    `${chalk.blue("[Grafi Info]")} ${chalk.green(
      `🚀  (${
        Object.keys(depsObj["dependencies"]).length
      }) Production Dependencies`
    )} ${chalk.red(
      `🚧  (${
        Object.keys(depsObj["devDependencies"]).length
      }) Development Dependencies`
    )}`
  );
  const deps = [].concat(
    ...Object.keys(depsObj).map(key => {
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
    })
  );

  const spinner = display.spinner("List project dependencies.");
  spinner.stop();
  display.table(["package", "version"], deps);
};

core.displayAnalysis = async (package = "") => {
  const message =
    package === "" || package === undefined
      ? "Analyze packages to get outdataed."
      : `Analyzing ${package}`;
  const spinner = display.spinner(message);
  // get the outdated packages
  const outdatedPackages = await npm.outdated();
  const outdatedPackagesNames = Object.keys(outdatedPackages);
  // get all packges
  const devAndProdDeps = await packages.getAll();
  const devAndProdDepsNames = [].concat(
    ...Object.keys(devAndProdDeps).map(name =>
      Object.keys(devAndProdDeps[name])
    )
  );
  // get not-outdated packages
  const notoutDatedPackagesNames = devAndProdDepsNames.filter(
    devAndProdDepsName => !outdatedPackagesNames.includes(devAndProdDepsName)
  );
  spinner.stop();
  log(
    `${chalk.blue("[Grafi info]")} ${chalk.green(
      `Analyzed ${chalk.red(`(${devAndProdDepsNames.length})`)} packages`
    )}`
  );
  log(
    `${chalk.blue("[Grafi info]")} ${chalk.green(
      `✔ ${chalk.red(`(${notoutDatedPackagesNames.length})`)} uptodate`
    )} ${chalk.green(
      `× ${chalk.red(`(${outdatedPackagesNames.length})`)} outdated`
    )}`
  );
  if (package === "") {
    let outdated_data_table = outdatedPackagesNames.map(name => [
      chalk.red("× " + name),
      outdatedPackages[name].current,
      outdatedPackages[name].latest
    ]);

    let uptodate_data_table = notoutDatedPackagesNames.map(name => {
      if (devAndProdDeps["dependencies"][name]) {
        const version = devAndProdDeps["dependencies"][name].includes("^")
          ? devAndProdDeps["dependencies"][name].trim().split("^")[1]
          : devAndProdDeps["dependencies"][name];
        return [chalk.green("✔ " + name), version, version];
      } else {
        let version = devAndProdDeps["devDependencies"][name];
        if (version.includes("^")) {
          version = version.trim().split("^")[1];
        } else if (version.includes("$")) {
          version = version.trim().split("$")[1];
        } else if (version.includes("~")) {
          version = version.trim().split("~")[1];
        }
        return [chalk.green("✔ " + name), version, version];
      }
    });
    display.table(
      ["  package", "version", "latest"],
      [...outdated_data_table, ...uptodate_data_table]
    );
  } else {
    const required_package = outdatedPackages[package];
    log(chalk.green(package));
    log(chalk.blue(treeify.asTree(required_package, true)));
  }
};

core.displayErrorMessage = async () => {
  log(
    chalk.red(
      figlet.textSync("Oh, we are sorry.", {
        horizontalLayout: "default"
      })
    )
  );
  log(
    `${chalk.red("[Grafi Error]")}: ${chalk.red.green(
      "report an issue https://github.com/ahmedmenaem/grafi/issues"
    )}`
  );
};

module.exports = core;
