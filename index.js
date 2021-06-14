const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      
      // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
      {
        type: "input",
        name: "managerName",
        message: "Manager's Name:"
      },
      {
        type: "input",
        name: "managerId",
        message: "Manager's ID:"
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Manager's Email:"
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Manager's Office Number:"
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      {
        type: "input",
        name: "engineerName",
        message: "Engineer's Name:"
      },
      {
        type: "input",
        name: "engineerId",
        message: "Engineer's ID:"
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Engineer's Email:"
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "Engineer's Github:"
      }

    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerOfficeNumber);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
 
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([ 
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      {
        type: "input",
        name: "internName",
        message: "Intern's Name:"
      },
      {
        type: "input",
        name: "internId",
        message: "Intern's ID:"
      },
      {
        type: "input",
        name: "internEmail",
        message: "Intern's Email:"
      },
      {
        type: "input",
        name: "internSchool",
        message: "Intern's school:"
      }

    ]).then(answers => {
    
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internOfficeNumber);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
