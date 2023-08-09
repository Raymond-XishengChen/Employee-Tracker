require('dotenv').config();
const inquirer = require('inquirer');
const db = require('./db/connection');

const promptUser = function(){
    inquirer.prompt(questions);
}