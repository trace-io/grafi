# Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## grafi

command line tool for nodeJS dependencies analysis

## Install Grafi

```
npm i -g grafi
yarn add global grafi
```

## Usage

- grafi --version

```
  / ___|  _ __    __ _   / _| (_)
 | |  _  | '__|  / _` | | |_  | |
 | |_| | | |    | (_| | |  _| | |
  \____| |_|     \__,_| |_|   |_|

Grafi version 1.0.0
Usage: index [options]

Options:
  -V, --version                    output the version number
  -a, --analsyis                   show project analysis
  -l, --list                       show project dependencies list
  -s, --show [package] <required>  show packgae dependencies
  -h, --help                       output usage information
```

- grafi --version

```
version 1.0.0
```

- grafi -l or grafi --list

```
list all project dependencies
Project Dependencies
┌───────────┬─────────┐
│ package   │ version │
│ chalk     │ ^2.4.2  │
│ cli-table │ ^0.3.1  │
│ clui      │ ^0.3.6  │
│ commander │ ^2.19.0 │
│ figlet    │ ^1.2.1  │
│ inquirer  │ ^6.2.2  │
│ treeify   │ ^1.1.0  │
└───────────┴─────────┘
Project Dev Dependencies
┌─────────┬──────────┐
│ package │ version  │
│ nodemon │ ^1.18.10 │
└─────────┴──────────┘
```

- grafi -a or grafi --analsyis

```
check for oudated packages
┌─────────────────────────────────────┬─────────┬──────────────┐
│   package                           │ version │ latest       │
│ × @angular-devkit/build-angular     │ 0.6.8   │ 0.13.6       │
│ × @angular/animations               │ 5.2.11  │ 7.2.10       │
│ × @angular/cdk                      │ 5.2.5   │ 7.3.5        │
│ × @angular/cli                      │ 6.1.3   │ 7.3.6        │
│ × @angular/common                   │ 5.2.11  │ 7.2.10       │
│ × @angular/compiler                 │ 5.2.11  │ 7.2.10       │
│ × @angular/compiler-cli             │ 5.2.11  │ 7.2.10       │
│ × @angular/core                     │ 5.2.11  │ 7.2.10       │
│ × @angular/forms                    │ 5.2.11  │ 7.2.10       │
│ × @angular/http                     │ 5.2.11  │ 7.2.10       │
│ × @angular/language-service         │ 5.2.11  │ 7.2.10       │
│ × @angular/material                 │ 5.2.5   │ 7.3.5        │
│ × @angular/platform-browser         │ 5.2.11  │ 7.2.10       │
│ × @angular/platform-browser-dynamic │ 5.2.11  │ 7.2.10       │
│ × zone.js                           │ 0.8.26  │ 0.8.29       │
└─────────────────────────────────────┴─────────┴──────────────┘
```

- grafi -s <package name> or grafi --show <package name>

```
to check only one packe
ts-node
├─ current: 4.1.0
├─ wanted: 4.1.0
├─ latest: 8.0.3
└─ location: node_modules\ts-node

```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
