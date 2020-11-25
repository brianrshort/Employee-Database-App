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


    const addEmployee = () => {
        return inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What's the employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What's the employee's last name?"
            },
            {
                type: "input",
                name: "roleName",
                message: "What is the employee's role id?",
            },
            {
                type: "input",
                name: "manName",
                message: "What is the employee's manager's employee id?",
            },
        ]).then(function({firstName, lastName, roleName, manName}) {
            
            var query = connection.query (
                "INSERT INTO employee SET ?",
                    {
                        first_name: firstName,
                        last_name: lastName,
                        role_id: roleName, 
                        manager_id: manName
                    },
                    function(err, res) {
                        console.log(res.affectedRows + " employees added! \n")
                        employeeQuery();
                    }
            )
    
        });
    }
    
    function employeeQuery() {
        connection.query("WITH previous_query AS (SELECT id, first_name AS 'manager_first', last_name AS 'manager_last' FROM employee) SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, previous_query.manager_first, previous_query.manager_last FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id JOIN previous_query ON employee.manager_id = previous_query.id ORDER BY employee.id ASC", function(err, res) {
            if (err) throw err;
                console.table(res);
                console.log("Pssst...hit 'CTRL-C' to exit!");
        })
    }
    
    
    const updateEmployee = () => {
        return inquirer.prompt([
            {
                type: "input",
                name: "empFirst",
                message: "What's the employee's first name that you want to update?"
            },
            {
                type: "input",
                name: "empLast",
                message: "What's the employee's last name that you want to update?"
            },
            {
                type: "input",
                name: "roleChange",
                message: "What is the role ID number you would like to change them to?"
            }
        ]).then(function({empFirst, empLast, roleChange}) {
            updateRole(empFirst, empLast, roleChange);
            console.log(empFirst, empLast, roleChange);
        })
    
    