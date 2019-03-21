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
core.isNodeProject = packageFiles => {
  if (Array.isArray(packageFiles)) {
    return packageFiles.filter(file => {
      if (fs.existsSync(file)) {
        return file;
      }
    });
  }
};

core.readFileContent = fileName => {
  return fs.readFileSync(fileName, "utf-8");
};

core.displayGrafi = async pkg => {
  log(chalk.blue(figlet.textSync("Grafi", { horizontalLayout: "full" })));
  log(chalk.red(`Grafi version ${pkg["version"]}`));
};

core.getDeps = async (depsObj, type = "") => {
  if (type === "dev") {
    log(chalk.green("Project Dev Dependencies"));
  } else {
    log(chalk.green("Project Dependencies"));
  }
  const packages = Object.keys(depsObj);
  const deps = packages.map(package => {
    const version = depsObj[package];
    return [package, version];
  });
  let spinner = new Spinner(
    chalk.green("\nList project dependencies.\n"),
    spinnerShape
  );
  // start pinner
  spinner.start();
  const depstable = new Table({
    defaultValue: 0, //defaults to "?"
    errorOnNull: false,
    chars: { mid: "", "left-mid": "", "mid-mid": "", "right-mid": "" },
    head: ["package", "version"]
  });
  depstable.push(...deps);
  log(chalk.blue(depstable));
  // stop spinner
  spinner.stop();
};

core.isDepExist = depName => {
  const depPath = "./node_modules/" + depName;
  const isDepexist = fs.existsSync(depPath);
  // const dirFiles = fs.readdirSync(depPath);
  // const fileSize = fs.statSync(depPath);
  return isDepexist;
};

core.analyze = async package => {
  spinner = new Spinner(
    chalk.green(
      package === ""
        ? "Analyze packages to get outdataed."
        : `Analyzing ${package}`
    ),
    spinnerShape
  );
  try {
    spinner.start();
    const outdated = await exec("npm outdated --json");
    return outdated.stdout;
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
  // console.log(deps);
  if (package === "") {
    const required_table = names.map(name => [
      deps[name].current !== deps[name].latest
        ? chalk.red("× " + name)
        : chalk.green(name),
      deps[name].current,
      deps[name].latest
    ]);
    const table = new Table({
      chars: { mid: "", "left-mid": "", "mid-mid": "", "right-mid": "" },
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

core.getDepDeps = depName => {};

module.exports = core;
