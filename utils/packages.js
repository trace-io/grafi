const files = require('./files');
const display = require('./display');
// const exec = require('util').promisify(require('child_process').exec);
const execSync = require('child_process').execSync;
const commandExists = require('command-exists').sync;

const packages = {};

packages.getAll = async (type) => {
	// check if package.json exist
	const isPackageJsonExists = await files.isFileExist('package.json');
	if (!isPackageJsonExists) return [];
	// read file content and check if it a valid json
	const fileContent = await files.readFile('package.json');
	if (!files.isJSONContent(fileContent)) return [];
	// extract packages
	const { devDependencies, dependencies } = JSON.parse(fileContent);
	switch (type) {
		case 'dependencies':
			return dependencies ? dependencies : {};
		case 'devDependencies':
			return devDependencies ? devDependencies : {};
		default:
			return {
				dependencies: dependencies ? dependencies : {},
				devDependencies: devDependencies ? devDependencies : {}
			};
	}
};

packages.getOne = (packageName) => {};

packages.isNpmProject = async () => await files.isFileExist('package.json');

packages.isYarnProject = async () => await files.isFileExist('yarn.lock');

packages.isNpmExist = () => commandExists('npm');

packages.isYarnExist = () => commandExists('yarn');

packages.installPackage = (pkg, type = 'prod', manager = 'yarn') => {
	if (manager === 'yarn') {
		if (type === 'dev') {
			display.message('info', `yarn add ${pkg} --dev`);
			const res = execSync(`yarn add ${pkg} --dev`).toString();
			display.message('', res);
			if (res.includes('Saved') || res.includes('success')) {
				display.message('success', `${pkg} saved succssefully!`);
			} else {
				display.message('error', `Couldn't install ${pkg}`);
				display.message('info', `Please check above logs`);
			}
		} else {
			display.message('info', `yarn add ${pkg}`);
			const res = execSync(`yarn add ${pkg}`).toString();
			display.message('', res);
			if (res.includes('Saved') || res.includes('success')) {
				display.message('success', `${pkg} saved succssefully!`);
			} else {
				display.message('error', `Couldn't install ${pkg}`);
				display.message('info', `Please check above logs`);
			}
		}
	} else if (manager === 'npm') {
		if (type === 'dev') {
			display.message('info', `npm i ${pkg} --save-dev`);
			const res = execSync(`npm i ${pkg} --save-dev`).toString();
			if (res.includes('added')) {
				display.message('success', `${pkg} saved succssefully!`);
			} else if (res.includes('updated')) {
				display.message('success', `${pkg} updated succssefully!`);
			}
		} else {
			display.message('info', `npm i ${pkg} --save`);
			const res = execSync(`npm i ${pkg} --save`).toString();
			if (res.includes('added')) {
				display.message('success', `${pkg} saved succssefully!`);
			} else if (res.includes('updated')) {
				display.message('success', `${pkg} updated succssefully!`);
			} else {
				display.message('error', `Couldn't install ${pkg}`);
				display.message('info', `Please check above logs`);
			}
		}
	}
};
module.exports = packages;
