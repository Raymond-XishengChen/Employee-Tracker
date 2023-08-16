-- Drop the database if it exist already
DROP DATABASE IF EXITS employment_db;
CREATE DATABASE employment_db;

-- Choose the employment database
USE employment_db;

-- Create a table contains the departments
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Create a table contains the roles
-- Link the table with departments with foreign IDs
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
    
);

-- Create a table contains the employees
-- Link the table with roles using foreign IDs
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
)

