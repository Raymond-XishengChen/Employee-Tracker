const connection = require("./db/connection");
const inquirer = require("inquirer");
// const cTable = require("console.table");
// const Chalk = require("chalk");
prompt = inquirer.createPromptModule();

connection.connect((error) => {
  if (error) throw error;
});

prompt([
  {
    type: "list",
    message: [
      "Welcome to Employee Tracker. Select continue to begin."
  ],
    choices: ["Continue", "Quit"],
    name: "start",
  },
]).then((response) => {
  switch (response.start) {
    case "Continue":
      menu();
      break;
    case "Quit":
      return console.log("Restart the application and try again.");
  }
});

function menu() {
  prompt([
    {
      name: "choices",
      type: "list",
      message: `${Chalk.black.bgGreen(
        "Which action would you like to perform?"
      )}`,
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Update Employee Role",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Exit",
      ],
    },
  ]).then((answers) => {
    const { choices } = answers;
    if (choices === "View All Employees") {
      viewAllEmployees();
    }
    if (choices === "View All Roles") {
      viewAllRoles();
    }
    if (choices === "View All Departments") {
      viewAllDepartments();
    }
    if (choices === "Update Employee Role") {
      updateEmployeeRole();
    }
    if (choices === "Add Employee") {
      addEmployee();
    }
    if (choices === "Add Role") {
      addRole();
    }
    if (choices === "Add Department") {
      addDepartment();
    }
    if (choices === "Exit") {
      console.log("Thanks for using Employee Tracker. Until next time.");
      connection.end();
    }
  });
}