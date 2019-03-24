const files = require("./files");

const packages = {};
packages.getAll = async type => {
  // check if package.json exist
  const isPackageJsonExists = await files.isFileExist("package.json");
  if (!isPackageJsonExists) return [];
  // read file content and check if it a valid json
  const fileContent = await files.readFile("package.json");
  if (!files.isJSONContent(fileContent)) return [];
  // extract packages
  const { devDependencies, dependencies } = JSON.parse(fileContent);
  switch (type) {
    case "dependencies":
      return dependencies ? dependencies : {};
    case "devDependencies":
      return devDependencies ? devDependencies : {};
    default:
      return {
        dependencies: dependencies,
        devDependencies: devDependencies
      };
  }
};
packages.getOne = packageName => {};

module.exports = packages;
