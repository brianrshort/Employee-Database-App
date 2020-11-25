const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employee_tracker_DB"
});

function updateDB() {
    inquirer.prompt([
        {
            type: "list",
            name: "userAction",
            message: "What would you like to do?",
            choices: [
                "Add an employee",
                "Add a role",
                "Add a department",
                "View employees",
                "View roles",
                "View departments",
                "Update someone's role",
                "Update manager assignment",
                "Search by manager assignment",
                "Delete employee",
                "Delete role",
                "Delete department",
                "View total budget",
                "View department budget"

            ]
        }
    ]).then(answer => {
        switch(answer.userAction) {
            case "Add an employee":
               addEmployee();
                break;
            case "Update someone's role":
                updateEmployee();
                break;
            case "View employees":
                employeeQuery();
                break;
            case "Add a role":
                addRole();
                break;
            case "View roles":
                roleQuery();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "View departments":
                departmentQuery();
                break;
            case "Update manager assignment":
                updateManager();
                break;
            case "Search by manager assignment":
                searchManager();
                break;
            case "Delete employee":
                deleteEmployee();
                break;
            case "Delete role":
                deleteRole();
                break;
            case "Delete department":
                deleteDepartment();
                break;
            case "View total budget":
                viewBudget();
                break;
            case "View department budget":
                departmentBudget();
                break;
            default:
                console.log("Cash me outside!");
                break;
        }
    });
    }

