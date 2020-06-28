#!/usr/bin/env node

const {
  program
} = require('commander');
const version = require("../package.json").version;

program
  .version(version)
  .usage('<command> [options]')
  // .option('-host, --host <host>', ' description')
  .action(function (arg,comment) {
    let projectName = comment&&comment[0]||'vue-admin-base';
    require("../lib/build")({projectName})
  })
 

program.parse(process.argv);