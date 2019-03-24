const exec = require("util").promisify(require("child_process").exec);

const npm = {};
npm.outdated = async () => {
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
      return {};
    }
  }
};
module.exports = npm;
