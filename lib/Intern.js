// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const { terminalWidth } = require("yargs");
const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school){
    super(name,id,email);
    this.school = school;
  }

  getSchool(){

  };

  getRole(){
    return Intern;
  }
};


intern.getName();
intern.getID();
intern.getEmail();
intern.getRole();