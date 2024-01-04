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

const isEngineer = (answers) => answers.employees === 'Add an Engineer'
const isIntern = (answers) => answers.employees === 'Add an Intern'


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
  },
  {
    type:'list',
    name:'employees',
    message:'Please select the type of employee you would like to create a profile of',
    choices:['Add an Engineer', 'Add an Intern', 'Finish building the team']
  },
  {
    type:'input',
    name:'engineerName',
    message:'What is the name of the engineer?',
    when: isEngineer
  },
  {
    type:'input',
    name:'id',
    message:'What is the employee ID',
    when: isEngineer
  },
  {
    type:'input',
    name:'email',
    message:'Enter the email address for the engineer',
    when: isEngineer
  },
  {
    type:'input',
    name:'github',
    message:'Please input GitHub username',
    when: isEngineer
  },
  {
    type:'input',
    name:'internName',
    message:'What is the name of the intern?',
    when: isIntern
  },
  {
    type:'input',
    name:'employeeID',
    message:'What is the employee ID',
    when: isIntern
  },
  {
    type:'input',
    name:'email',
    message:'Enter the email address for the intern',
    when: isIntern
  },
  {
    type:'input',
    name:'school',
    message:'Enter the name of the school',
    when: isIntern
  },
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