const store = require('./store');
const packages = require('./packages');
const display = require('./display');
const chalk = require('chalk');
const core = require('./core');

const snapshots = {};
const formatTime = (timestamps) => {
    const date = new Date(timestamps);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
snapshots.takeSnapshot = async (snapshot) => {
    if (snapshot === true) {
        displaydisplay.message('error', `please enter a valid snapshot name`);
        display.message('info', `grafi --snapshot <snapshot name>`);
    } else if (snapshot && !store.has(`snapshots.${snapshot}`)) {
        const spinner = display.spinner(`creating snapshot with name (${snapshot})`);
        let deps = await packages.getAll();
        const done = store.save(`snapshots.${snapshot}`, {
            ...deps,
            takenAt: Date.now()
        });
        spinner.stop();
        display.message('info', "snapshot saved successfully");
    } else {
        display.message('error', `snapshot with the name (${snapshot}) already exists`);
        display.message('info', `grafi --snapshots ${snapshot}`);
    }
}

snapshots.displaySnapshots = async (snapshot) => {
    if (snapshot === true) {
        if (store.has(`snapshots`)) {
            const snapshots = store.getOne(`snapshots`);
            const snapshotsCounts = Object.keys(snapshots).length;
            display.message('info', `Total (${chalk.red(snapshotsCounts)}) snapshots`);
            Object.keys(snapshots).forEach(snap => {
                snap = chalk.green(snap);
                display.message('', `${chalk.blue("*")} ${snap}`)
            });
            display.message('info', `grafi --snapshots <snapshot name>`)
        } else {
            display.message('info', `No snapshots created yet`);
            display.message('info', `grafi --snapshot <snapshot name>`)
        }
    } else {
        if (store.has(`snapshots.${snapshot}`)) {
            let deps = store.getOne(`snapshots.${snapshot}`);
            const takenAt = deps.takenAt ? 'takenAt ' + formatTime(deps.takenAt) : ''
            display.message('info', `${chalk.green(snapshot)} snapshot ${takenAt}`);
            core.displayProductionAndDevelopmentDependencies(deps);
        } else {
            display.message('error', `snapshot with the name (${snapshot}) does not exists`);
        }
    }
}
module.exports = snapshots;