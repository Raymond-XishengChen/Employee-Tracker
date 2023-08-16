
INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Software Engineer", 10000, 2),
        ("Lawyer", 11000, 4),
        ("Accountant", 11000, 3),
        ("Sales Support", 9000, 1),
        ("Engineering Manager", 15000, 2),
        ("Sales Manager", 18000, 1),
        ("Finance Manager", 17000, 3),
        ("Legal Manager", 19000, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES  ("Sean", "George", 5, 1),
        ("Chris", "Morris", 6, 4),
        ("Victor", "Martin", 7, 3),
        ("Josh", "Crookes", 8, 2),
        ("Rick", "Willson", NULL, 5),
        ("Alfred", "Adam", NULL, 6),
        ("Jack", "Howard", NULL, 7),
        ("Alex", "Rod", NULL, 8);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;