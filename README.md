# Markdown to JsonML

[![](https://img.shields.io/travis/noyobo/md2jsonml.svg?style=flat-square)](https://travis-ci.org/noyobo/md2jsonml)
[![Codecov](https://img.shields.io/codecov/c/github/noyobo/md2jsonml/master.svg?style=flat-square)](https://codecov.io/gh/noyobo/md2jsonml/branch/master)
[![npm package](https://img.shields.io/npm/v/md2jsonml.svg?style=flat-square)](https://www.npmjs.org/package/md2jsonml)
[![NPM downloads](http://img.shields.io/npm/dm/md2jsonml.svg?style=flat-square)](https://npmjs.org/package/md2jsonml)
[![Dependency Status](https://david-dm.org/noyobo/md2jsonml.svg?style=flat-square)](https://david-dm.org/noyobo/md2jsonml)

Parse markdown to [JsonML](http://www.jsonml.org/), work on NodeJS and Browser.

## Features

- Support HTML tags
- Support reference

## Installation

```bash
npm install md2jsonml
```

## Usage

```
const md2jsonml = require('md2jsonml');

cosnt jsonml = md2jsonml('## Markdown content')
```
