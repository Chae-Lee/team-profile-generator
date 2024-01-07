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

// const isEngineer = (answers) => answers.employees === 'Add an Engineer';
// const isIntern = (answers) => answers.employees === 'Add an Intern';
const anotherEmployee = (engineerAnswers) => engineerAnswers.anotherEmployee === 'Yes';
const anotherEmployeeTwo = (internAnswers) => internAnswers.anotherEmployee === 'Yes';
const additionalEngineer = (additionalAnswer) => addingEmployeeQuestion.moreEmployees === 'Add an Engineer';
const additionalIntern = (additionalAnswer) => addingEmployeeQuestion.moreEmployees === 'Add an Intern';

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
    choices:['Add an Engineer', 'Add an Intern', 'Finish building the team'],
  },
]

const engineerQuestions = [
  {
    type:'input',
    name:'engineerName',
    message:'What is the name of the engineer?',
  },
  {
    type:'input',
    name:'id',
    message:'What is the employee ID',
  },
  {
    type:'input',
    name:'email',
    message:'Enter the email address for the engineer',
  },
  {
    type:'input',
    name:'github',
    message:'Please input GitHub username',
  },
  {
    type:'list',
    name:'anotherEmployee',
    message:'Would you like to add another employee?',
    choices:['Yes', 'No'],
  },
]

const internQuestions = [
  {
    type:'input',
    name:'internName',
    message:'What is the name of the intern?',
  },
  {
    type:'input',
    name:'employeeID',
    message:'What is the employee ID',
  },
  {
    type:'input',
    name:'email',
    message:'Enter the email address for the intern',
  },
  {
    type:'input',
    name:'school',
    message:'Enter the name of the school',
  },
  {
    type:'list',
    name:'anotherEmployee',
    message:'Would you like to add another employee?',
    choices:['Yes', 'No'],
  },
];

const addingEmployeeQuestion = [
  {
    type:'list',
    name:'moreEmployees',
    message:'Please select the type of employee you would like to create a profile of',
    choices:['Add an Engineer', 'Add an Intern', 'Finish building the team'],
  },
];

const writeToFile = (fileName, data) => {
  fs.writeFile (fileName, data, (err) => {
    console.log ('testing');
  });
};

const employeeAddition = (additionalAnswer) => {
  inquirer.prompt(addingEmployeeQuestion).then((additionalAnswer)=> {
  console.log(additionalAnswer);
  if (additionalAnswer.moreEmployees === 'Add an Engineer'){
    engineerAddition();
  } else if (additionalAnswer.moreEmployees === 'Add an Intern'){
    internAddition();
  } else {
    console.log('Generating a HTML file...');
    writeToFile();
  };
})
};

const engineerAddition = (engineerAnswers) => {
  inquirer.prompt(engineerQuestions).then((engineerAnswers)=> {
    console.log(engineerAnswers);
    employeeAddition();
    if (internAnswers.anotherEmployee !== 'Yes'){
      console.log('Generating a HTML file...');
      writeToFile();
    }
  })
};

const internAddition = (internAnswers) => {
  inquirer.prompt(internQuestions).then((internAnswers)=> {
    console.log(internAnswers);
    employeeAddition();
    if (internAnswers.anotherEmployee !== 'Yes'){
      console.log('Generating a HTML file...');
      writeToFile();
    }
  })
}


const init = () => {
  inquirer.prompt(questions).then((answers) => {
    console.log(answers);
    if (answers.employees === 'Add an Engineer') {
      engineerAddition();
    } else if (answers.employees === 'Add an Intern'){
      internAddition();
    } else {
      console.log('Generating a HTML file...');
      writeToFile('team.html', team(answers));
    }
  });
}

init();

