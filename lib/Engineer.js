// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github){
    super(name,id,email);
    this.github = github;
  }
  getGithub(){
    
  };

  getRole(){
    return Engineer;
  }
};


const engineer = new Engineer("Kate", 20, "katelee@gmail.com", "chae-lee")

console.log("---Engineer---");
engineer.getName();
engineer.getID();
engineer.getEmail();
engineer.getRole();