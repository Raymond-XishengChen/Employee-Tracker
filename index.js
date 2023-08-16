const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'qwer1510',
      database: 'employment_db'
    },
    console.log(`Connected to the the database.`)
  );

const question = [
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
        ],
    }
];

function init(){
    inquirer.prompt(question)
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
            case 'Add Department':
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
                break;
            }
        }
    )
};

// View All Employees
function viewAllEmployees(){
    const sql = `SELECT employee.id,
                roles.title,
                employee.first_name,
                employee.last_name,
                department.name AS department,
                roles.salary
                FROM employee, roles, department
                WHERE department.id = roles.department_id
                AND roles.id = employee.role_id`;

    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log("\n");
        return console.table(res);
    })
    init();
}



function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the first name of the new employee:',
            name: 'firstName',
        },
        {
            type: 'input',
            message: 'Please enter the last name of the new employee:',
            name: 'lastName',
        },
    ]).then((answer) => {
        const newEmployee = [answer.firstName, answer.lastName];
        const employSql = `SELECT roles.id, roles.title FROM roles`;
        connection.query(employSql, (err, data) => {
            if (err) throw err;
            const roles = data.map(({ id, title }) => ({ name: title, value: id }));
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Please select the role of the new employee:',
                    choices: roles,
                    name: 'role',
                },
            ]).then((roleSelection) => {
                const role = roleSelection.role;
                newEmployee.push(role);
                const managerSql = `SELECT * FROM employee`;
                connection.query(managerSql, (error, data) => {
                if (error) throw error;
                const managers = data.map(({ id, first_name, last_name }) => ({
                    name: first_name + " " + last_name,
                    value: id,
                }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Please select a manager for the new employee:',
                        choices: managers,
                    },
                ]).then((managerChoice) => {
                    const manager = managerChoice.manager;
                    newEmployee.push(manager);
                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                    connection.query(sql, newEmployee, (err) => {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    viewAllEmployees();
                    });
                });
                });
            });
        });
    });
    };
    
function addRole(){
    const sql = 'SELECT * FROM department';
    connection.query(sql, (err, res) => {
        if (err) throw err;
        const departments = res.map(department => department.name);
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the name of the new role:',
                name: 'title',
            },
            {
                type: 'input',
                message: 'Please enter the salary of the new role:',
                name: 'salay'
            },
            {
                type: 'list',
                message: 'Please select the department that you want to add the new role into:',
                name: 'department',
                choices: departments
            }
        ])
        .then (res => {
            const newRoleTitle = res.title;
            let departmentID;

            res.forEach((department) => {
                if (departments === department.name){
                    departmentID = department.id;
                }
            })

            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            const newRole = [newRoleTitle, res.salary, departmentID];

            connection.query(sql, newRole, (err) => {
                if (err) throw err;

            })
            viewAllRoles();

        });


    })
}


// Add Department
function addDepartment(){
    inquirer.prompt ([
        {
            type: 'input',
            message: 'Please enter the name of the new department:',
            name: 'departmentName'
        }
    ]).then ((response) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        connection.query(sql, response.departmentName, (err, res) => {
            if (err) throw err;
        })
        console.log("New department added");
        viewAllDepartment();
    })
}

// View All Roles
function viewAllRoles(){
    const sql = `SELECT roles.id,
                roles.title,
                department.name AS department
                FROM roles
                JOIN department ON roles.department_id = department.id
                ORDER BY department ASC`;

    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
    })
    init();
}


// View All Departments
function viewAllDepartment(){
    const sql = `SELECT department.id AS id,
                department.name AS department
                FROM department
                ORDER BY department.id ASC`;

    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
    })
    init();
}

init();



