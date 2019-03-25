## grafi

command line tool for nodeJS dependencies analysis

## Install Grafi

```
npm i -g grafi
yarn add global grafi
```

## Usage

- grafi

```
   ____                   __   _ 
  / ___|  _ __    __ _   / _| (_)
 | |  _  | '__|  / _` | | |_  | |
 | |_| | | |    | (_| | |  _| | |
  \____| |_|     \__,_| |_|   |_|
                                 
Grafi version 1.0.2-beta
Usage: grafi [options]

Options:
  -V, --version              output the version number
  -a, --analysis             show project analysis
  -l, --list [packagesType]  show project dependencies list
  -h, --help                 output usage information
```

- grafi --version

```
version 1.0.0
```
# list all project dependencies

- grafi -l or grafi --list <type ['dev', 'prod'] optional>
```
list all project dependencies
[Grafi Info] 🚀  (5) Production Dependencies 🚧  (1) Development Dependencies
 package               version
 🚀   @reach/router      1.2.1
 🚀   antd               3.13.1
 🚀   react              16.7.0
 🚀   react-dom          16.7.0
 🚀   reqwest            2.0.5
 🚧   parcel-bundler     1.11.0
```

# check for oudated and uptodate packages
- grafi -a or grafi --analysis
```
[Grafi info] Analyzed (6) packages
[Grafi info] ✔ (2) uptodate × (4) outdated
  package          version   latest
 × antd             3.13.1    3.15.2
 × parcel-bundler   1.11.0    1.12.3
 × react            16.7.0    16.8.5
 × react-dom        16.7.0    16.8.5
 ✔ @reach/router    1.2.1     1.2.1
 ✔ reqwest          2.0.5     2.0.5
```

# snapshots
```
snapshot is very helpfull for memorize project dependencies
```
## take snapshot
- grafi --snapshot <name>
```
[info] snapshot saved successfully
```
## list all snapshots
- grafi --snapshots <name optional>
```
[info] Total (1) snapshots
* mysnapshot
[info] grafi --snapshots <snapshot name>

```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
