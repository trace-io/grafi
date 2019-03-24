const fs = require("fs");

const files = {};
files.isFileExist = async filePath => fs.existsSync(filePath);

files.readFile = async fileName => fs.readFileSync(fileName, "utf-8");

files.isJSONContent = async fileContent => {
  try {
    JSON.parse(fileContent);
    return true;
  } catch (ex) {
    return false;
  }
};

module.exports = files;
