const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./src/page-template.js");

const team = [];

// Array of questions for Manager to answer - displayed in the Integrated Terminal
const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "employeeID",
    message: "What is your Employee ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email address?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Please input your office number:",
  },
];

//Array of questions specific for adding Engineers
const engineerQuestions = [
  {
    type: "input",
    name: "engineerName",
    message: "What is the name of the engineer?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the employee ID?",
  },
  {
    type: "input",
    name: "email",
    message: "Enter the email address for the engineer:",
  },
  {
    type: "input",
    name: "github",
    message: "Please input GitHub username:",
  },
  {
    type: "list",
    name: "anotherEmployee",
    message: "Would you like to add another employee?",
    choices: ["Yes", "No"],
  },
];

//Array of questions specific for adding Interns
const internQuestions = [
  {
    type: "input",
    name: "internName",
    message: "What is the name of the intern?",
  },
  {
    type: "input",
    name: "employeeID",
    message: "What is the employee ID:",
  },
  {
    type: "input",
    name: "email",
    message: "Enter the email address for the intern:",
  },
  {
    type: "input",
    name: "school",
    message: "Enter the name of the school:",
  },
  {
    type: "list",
    name: "anotherEmployee",
    message: "Would you like to add another employee?",
    choices: ["Yes", "No"],
  },
];

//Question for adding more employees to the profile
const addingEmployeeQuestion = [
  {
    type: "list",
    name: "moreEmployees",
    message:
      "Please select the type of employee you would like to create a profile of",
    choices: ["Add an Engineer", "Add an Intern", "Finish building the team"],
  },
];

//Function that collects Engineer info and pushes into the team array
const engineerAddition = (engineerAnswers) => {
  inquirer.prompt(engineerQuestions).then((engineerAnswers) => {
    let engineerInfo = engineerAnswers;
    team.push(
      new Engineer(
        engineerInfo.engineerName,
        engineerInfo.id,
        engineerInfo.email,
        engineerInfo.github
      )
    );

    if (engineerAnswers.anotherEmployee === "Yes") {
      employeeAddition();
    } else {
      console.log(
        "Finished adding team members - HTML file created and team profile is complete"
      );
      let dataForFile = render(team);
      fs.writeFileSync(outputPath, dataForFile);
    }
  });
};

//Function that collects Intern info and pushes into the team array
const internAddition = (internAnswers) => {
  inquirer.prompt(internQuestions).then((internAnswers) => {
    let internInfo = internAnswers;
    team.push(
      new Intern(
        internInfo.internName,
        internInfo.employeeID,
        internInfo.email,
        internInfo.school
      )
    );
    if (internAnswers.anotherEmployee === "Yes") {
      employeeAddition();
    } else {
      console.log(
        "Finished adding team members - HTML file created and team profile is complete"
      );
      let dataForFile = render(team);
      fs.writeFileSync(outputPath, dataForFile);
    }
  });
};

//Function where initial Manager questions are called with user input pushed to the team array
const init = () => {
  inquirer.prompt(questions).then((answers) => {
    team.push(
      new Manager(
        answers.name,
        answers.employeeID,
        answers.email,
        answers.officeNumber
      )
    );
    //Function to add more employees are called
    employeeAddition();
  });
};

//Function to add more employees to the team profile
const employeeAddition = (additionalAnswer) => {
  inquirer.prompt(addingEmployeeQuestion).then((additionalAnswer) => {
    if (additionalAnswer.moreEmployees === "Add an Engineer") {
      engineerAddition();
    } else if (additionalAnswer.moreEmployees === "Add an Intern") {
      internAddition();
    } else {
      console.log(
        "Finished adding team members - HTML file created and team profile is complete"
      );
      let dataForFile = render(team);
      fs.writeFileSync(outputPath, dataForFile);
    }
  });
};

init();
