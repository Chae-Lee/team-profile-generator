const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const team = require("./src/page-template");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const questions = [
  {
    type:'input',
    name:'name',
    message:'What is your name?'
  },
  {
    type:'input',
    name:'employeeID',
    message:'What is your Employee ID?'
  },
  {
    type:'input',
    name:'email',
    message:'What is your email address?'
  },
  {
    type:'input',
    name:'officeNumber',
    message:'Please input your office number'
  }
];

function writeToFile(fileName, data) {
  fs.writeFile (fileName, data, (err) => {
    console.log ('testing');
  });
}

function init() {
  inquirer.prompt(questions).then((answers) => {
    console.log(answers);
    console.log('Generating a HTML file...');
    writeToFile('team.html', team(answers));
  });
}

init();