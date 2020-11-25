DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER references ROLE(id),
  manager_id INTEGER references EMPLOYEE(id),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INTEGER references DEPARTMENT(id),
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Operations"), ("Intelligence"), ("Fundraising"), ("Administration"), ("Human Resources"), ("Marketing"), ("Design"), ("Communications"), ("Editorial"), ("Social");

INSERT INTO role (title, salary, department_id)
VALUES ("purchaser", 30000.00, 1), 
("writer", 40000.00, 9), 
("counselor", 25000.00, 5), 
("analyst", 70000.00, 2), 
("solicitor", 90000.00, 3), 
("admin", 15000.00, 4), 
("graphic designer", 30000.00, 7), 
("PR specialist", 37000.00, 8), 
("copywriter", 33000.00, 6), 
("tweeter", 1000.00, 10), 
("ops manager", 50000.00, 1), 
("fundraising manager", 100000.00, 3), 
("marcomm manager", 80000.00, 8); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Becky","Stapawrecki", 12, 1),
("Stavros","Mackapoulotropos", 11, 1),
("Hameed","Aziz", 13, 1),
("Josh","Boardman", 5, 1),
("Tiffani","Polzin", 4, 2),
("Amber","Wavzagrae", 3, 2),
("Stacy","Blacey", 2, 3),
("Fatima","Smith", 1, 2),
("Eloise","Dashapash", 10, 3),
("William","Wonkuh", 9, 3),
("Elle","Fantman", 8, 3),
("Chet","Flay", 7, 3),
("Happy","Glucky", 6, 2),
("Chip","Guevara", 4, 1),
("Fido","Castliogstro", 1, 1),
("Chance","Mayeeting", 6, 1);

