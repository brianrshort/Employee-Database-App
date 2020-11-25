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
                console.log("Thank you for visiting!");
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
    
        function updateRole(firstname, lastname, rolechange) {
            console.log(firstname, lastname, rolechange);
            var query = connection.query (
                "UPDATE employee SET ? WHERE ? AND ?", [
                {
                    role_id: rolechange
                },
                {
                    first_name: firstname
                },
                {
                    last_name: lastname
                }
            ],
                function(err, res) {
                    console.log(res);
                    console.log(res.affectedRows + " employees updated! \n");
                    employeeQuery();
                }
            )
        }
        }
        
        function addRole() {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "roleTitle",
                    message: "What's the new role's title?"
                },
                {
                    type: "input",
                    name: "roleSalary",
                    message: "What's the new role's salary?"
                },
                {
                    type: "input",
                    name: "roleDepartment",
                    message: "What is the new role's department ID number?",
                }
            ]).then(function({roleTitle, roleSalary, roleDepartment}) {
                insertRole(roleTitle, roleSalary, roleDepartment);
            })
        }
        
        function insertRole(roleTitle, roleSalary, roleDepartment) {
            var query = connection.query (
                "INSERT INTO role SET ?",
                    {
                        title: roleTitle,
                        salary: roleSalary,
                        department_id: roleDepartment
                    },
                    function(err, res) {
                        console.log(res.affectedRows + " roles added! \n")
                        roleQuery();
                    }
            )
        }
        
        function roleQuery() {
            connection.query("SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id ORDER BY role.id ASC", function(err, res) {
                if (err) throw err;
                    console.table(res);
                    console.log("Pssst...hit 'CTRL-C' to exit!");
            })
        }
        
        
        function addDepartment() {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "departmentTitle",
                    message: "What's the new department's name?"
                }
            ]).then(function({departmentTitle}) {
                var query = connection.query (
                    "INSERT INTO department SET ?",
                        {
                            name: departmentTitle
                        },
                        function(err, res) {
                            console.log(res.affectedRows + " departments added! \n")
                            departmentQuery();
                        }
                )
            })
        }
        
        function departmentQuery() {
                connection.query("SELECT * FROM department ORDER BY id ASC", function(err, res) {
                    if (err) throw err;
                        console.table(res);
                        console.log("Pssst...hit 'CTRL-C' to exit!");
                })
        }
        
        const updateManager = () => {
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
                    name: "managerChange",
                    message: "What is the ID number of the manager you would like assign to this employee?"
                }
            ]).then(function({empFirst, empLast, managerChange}) {
                managerChanger(empFirst, empLast, managerChange);
            })
        
        function managerChanger(firstname, lastname, managerchange) {
            //console.log(firstname, lastname, managerchange);
            var query = connection.query (
                "UPDATE employee SET ? WHERE ? AND ?", [
                {
                    manager_id: managerchange
                },
                {
                    first_name: firstname
                },
                {
                    last_name: lastname
                }
            ],
                function(err, res) {
                    console.log(res);
                    console.log(res.affectedRows + " employees updated! \n");
                    employeeQuery();
                }
            )
        }
        }
        
        const searchManager = () => {
            return inquirer.prompt([
                {
                    type: "list",
                    name: "manName",
                    message: "Which manager's assignments would you like to review?",
                    choices: ["Becky Stapawrecki", "Stavros Mackapoulotropos","Hameed Aziz"]
                }
            ]).then(function({manName}) {
                console.log(manName);
                switch(manName) {
                    case "Becky Stapawrecki":
                        managerAssignments("Becky", "Stapawrecki");
                        break;
                    case "Stavros Mackapoulotropos":
                        managerAssignments("Stavros", "Mackapoulotropos");
                        break;
                    case "Hameed Aziz":
                        managerAssignments("Hameed", "Aziz");
                        break;
                };
            })
        }
        
        function managerAssignments(firstName, lastName) {
            var query = connection.query (
                "WITH previous_result AS (SELECT first_name, last_name, id FROM employee WHERE ? AND ?) SELECT * FROM previous_result JOIN employee WHERE previous_result.id = employee.manager_id;", 
                [
                    {
                        first_name: firstName
                    },
                    { 
                        last_name: lastName
                    }
                ],
            function(err, res) {
                //console.log(res);
                console.table(res);
                console.log("Pssst...hit 'CTRL-C' to exit!");
            }
            )
        }
        
        const deleteEmployee = () => {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "empFirst",
                    message: "What's the employee's first name that you want to delete?"
                },
                {
                    type: "input",
                    name: "empLast",
                    message: "What's the employee's last name that you want to delete?"
                }
            ]).then(function({empFirst, empLast}){
                var query = connection.query (
                    "DELETE FROM employee WHERE ? AND ?", [
                    {
                        first_name: empFirst
                    },
                    {
                        last_name: empLast
                    }
                ],
                    function(err, res) {
                        //console.log(res);
                        console.log(res.affectedRows + " employees removed! \n");
                        employeeQuery();
                    }
                )
              
            })
        }
        
        const deleteRole = () => {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "roleName",
                    message: "What's the name of the role that you want to delete?"
                }
            ]).then(function({roleName}){
                var query = connection.query (
                    "DELETE FROM role WHERE ?", [
                    {
                        title: roleName
                    }
                ],
                    function(err, res) {
                        //console.log(res);
                        console.log(res.affectedRows + " roles removed! \n");
                        roleQuery();
                    }
                )
              
            })
        }
        
        const deleteDepartment = () => {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "departmentName",
                    message: "What's the name of the department that you want to delete?"
                }
            ]).then(function({departmentName}){
                var query = connection.query (
                    "DELETE FROM department WHERE ?", [
                    {
                        name: departmentName
                    }
                ],
                    function(err, res) {
                        //console.log(res);
                        console.log(res.affectedRows + " departments removed! \n");
                        departmentQuery();
                    }
                )
              
            })
        }
        
        const viewBudget = () => {
            var query = connection.query (
                "SELECT SUM(salary) AS 'total' FROM employee JOIN role ON employee.role_id = role.id;", [
            ],
                function(err, res) {
                    //console.log(res[0]);
                    console.log("The total utilized budget is $" + res[0].total + ". \n");
                    console.log("Pssst...hit 'CTRL-C' to exit!");
                }
            )
        }
        
        const departmentBudget = () => {
            return inquirer.prompt([
                {
                    type: "list",
                    name: "departmentName",
                    message: "What's the name of the department that you want to view?",
                    choices: ["Operations", "Intelligence", "Fundraising", "Administration", "Human Resources", "Marketing", "Design", "Communications", "Editorial", "Social"]
                }
            ]).then(function({departmentName}){
                var query = connection.query (
                    "SELECT SUM(role.salary) AS 'total' FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id  WHERE ?;",
                [
                    {
                        name: departmentName
                    }
                ],
                    function(err, res) {
                        //console.log(res);
                        console.log(`The total budget for ${departmentName} is $${res[0].total}.`);
                        console.log("Pssst...hit 'CTRL-C' to exit!");
                    }
                )
              
            })
        }
        

        
        updateDB();
        
        