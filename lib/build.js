const inquirer = require("inquirer");
const chalk = require("chalk");
const fse = require("fs-extra");
const path = require("path");
//let fetch = require("node-fetch");
//let http = require("http");

async function build({ projectName }) {
  try {
    let cwd = process.cwd();
    let dist = path.resolve(cwd, projectName);
    await fse.copy(path.resolve(__dirname, "../project_template"), dist);
    let r = await fse.readFile(dist + "/package.json",'utf-8');
    await fse.writeFile(
      dist + "/package.json",
      r.replace(/vue-element-base/g, projectName)
    );

    console.log(chalk.green("√ 项目初始化成功"));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = (args) => {
  return build(args).catch((err) => {
    process.exit(1);
  });
};
