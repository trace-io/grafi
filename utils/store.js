const ConfigStore = require("configstore");
const pkg = require("../package.json");
const config = new ConfigStore(pkg.name);

const store = {};
store.getOne = key => {
  return config.get(key);
};
store.getAll = () => {
  return config.all;
};
store.delete = key => {
  return config.delete(key);
};
store.has = key => config.has(key);
store.save = (key, value) => config.set(key, value);
module.exports = store;
