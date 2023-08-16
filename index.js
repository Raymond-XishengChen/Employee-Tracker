// require('dotenv').config();
const inquirer = require('inquirer');
// const db = require('./db/connection');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: '3001',
        user: 'root',
        password: 'qwer1510',
        database: 'employment_db'
    }
)

    function init(){
        inquirer.prompt([
            {
            type: 'list',
            message: 'Welcome to employee tracker. What would you like to do? \nPlease select from the following list:',
            name: 'answers',
            choices:[
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Department',
                'Add Department',
                'Update Employees Manager',
                'View Employees By Manager',
                'Delete A Role',
                'Delete An Employee',
                'Delete A Department',
                'Exit'
            ]
        }
        ])
        .then (response => {
            switch (response.answers) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Department':
                    viewAllDepartment();
                    break;
                case 'Adcase:d Department':
                    addDepartment();
                    break;
                case 'Update Employees Manager':
                    updateEmployeesManager();
                    break;
                case 'View Employees By Manager':
                    viewEmployeesByManager();
                    break;
                case 'Delete A Role':
                    deleteARole();
                    break;
                case 'Delete An Employee':
                    dlelteAnEmployee();
                    break;
                case 'Delete A Department':
                    deleteADepartment();
                    break;
                case 'Exit':
                    connection.end();
                    console.log("exit");
                    break;
                }
            }
        )
    };

// View All Employees
function viewAllEmployees(){
    const query = 'SELECT * FROM employee';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        init();
    })
}

// Add Employee

// Update Employee Role

// View All Roles
function viewAllRoles(){
    const query = 'SELECT * FROM role';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        init();
    })
}

// View All Departments
function viewAllDepartment(){
    const query = 'SELECT * FROM department';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        init();
    })
}

init();



