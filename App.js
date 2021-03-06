global.DEBUG = true;
const fs = require("fs");
const { initializeApp } = require('./init.js');
const { configApp } = require ('./config.js');
const { tokenApp } = require ('./token.js');

const myArgs = process.argv.slice(2);
if(DEBUG) if(myArgs.length > 1) console.log('the App.args: ', myArgs);

switch (myArgs[0]) {
    case 'init':
        if(DEBUG) console.log(myArgs[0], ' - initialize the app.');
        initializeApp();
        break;
    case 'config':
        if(DEBUG) console.log(myArgs[0], ' - Config files - show, edit, reset.');
        configApp();
        break;
    case 'token':
        if(DEBUG) console.log(myArgs[0], ' - generate a user token');
        tokenApp();
        break;  
    case 'help':
    default:
        fs.readFile(__dirname + '/views/usage.txt', (error, data) => {
            if(error) throw error;
            console.log(data.toString());
        });
}