const fs = require('fs');
const path = require('path');

let init = `

App init <command>

Usage:

App init --all          creates the folder structure and config file
App init --mk           creates the folder structure
App init --cat          creates the config file with default settings`;

let configUsage = `

App config <command>

Usage:

App config --show       Shows the config file
App config --set        Sets the Config files 
App config --reset      Resets the config file with default settings`;

let tokenUsage = `

App token --show       Shows the  tokens and users
App token --add        Adds a user 
App token --gentoken      Generate a new token for the user
App token --update phone <user> Updates phone number of user
App token --update email <user> Updates email address of user`;


let usagetxt = `
App init <command>

Usage:

App init --all          creates the folder structure and config file
App init --mk           creates the folder structure
App init --cat          creates the config file with default settings

App config <command>

Usage:

App config --show       Shows the config file
App config --set        Sets the Config files 
App config --reset      Resets the config file with default settings

App token <command>

Usage:

App token --show       Shows the  tokens and users
App token --add        Adds a user 
App token --gentoken      Generate a new token for the user
App token --update phone <user> Updates phone number of user
App token --update email <user> Updates email address of user`

function initializeApp() {

const myArgs = process.argv.slice(2);
    switch (myArgs[1]) {
        case '--all':
            createFolder();
            createInit();
            createConfig();
            if(DEBUG) console.log('initializeApp.All() --all');
            break;
        case '--cat':
            createConfig();
            if(DEBUG) console.log('initializeApp.createInit() --cat');
            break;
        case '--mk':
        createFolder()
        if(DEBUG) console.log('initializeApp.createFolder() --mk');
        default:
            if(DEBUG) console.log('initializeApp - default');
    }
}




function createInit() {
    if(fs.existsSync(path.join(__dirname, './views'))) {
        fs.writeFile(path.join(__dirname, 'views', 'init.txt'), init, (err) => {
            if(err) console.log(err);
            else if(DEBUG) console.log('Data written to init.txt file');
        });
    }
    if(fs.existsSync(path.join(__dirname, './views'))) {
        fs.writeFile(path.join(__dirname, 'views', 'config.txt'), configUsage, (err) => {
            if(err) console.log(err);
            else if(DEBUG) console.log('Data written to config.txt file');
        });
    }
    if(fs.existsSync(path.join(__dirname, './views'))) {
        fs.writeFile(path.join(__dirname, 'views', 'token.txt'), tokenUsage, (err) => {
            if(err) console.log(err);
            else if(DEBUG) console.log('Data written to token.txt file');
        });
    }
    if(fs.existsSync(path.join(__dirname, './views'))) {
        fs.writeFile(path.join(__dirname, 'views', 'usage.txt'), usagetxt, (err) => {
            if(err) console.log(err);
            else if(DEBUG) console.log('Data written to token.txt file');
        });
    }
    
    let tokensjson = "[]"
    if(!fs.existsSync(__dirname, '/users/tokens.json')) {
        fs.writeFile(path.join(__dirname, 'users', 'tokens.json'), tokensjson,  (err) => {
            if(err) console.log(err);
            if(DEBUG) console.log('array made')
            
        });
    
    } else{
        if(DEBUG) console.log('Array already made')
    }
 }


function createFolder() {
    fs.mkdir(path.join(__dirname, 'views'), (err) => {
            
        if(err) console.log(err);
        else if(DEBUG) console.log('Views directory created.');
        
    
    });

    fs.mkdir(path.join(__dirname, 'users'), (err) => {
            
        if(err) console.log(err);
        else if(DEBUG) console.log('Users directory created.');
        
    
    });
}
const config = { 
    name: 'AppConfigCLI',
    version: '1.0.0',
    description: 'The Command Line Interface (CLI) for the App.',
    main: 'App.js',
    superuser: 'admin'
};

function createConfig() {
    try {
        let data = JSON.stringify(config, null, 2);
        if(!fs.existsSync(path.join(__dirname, 'config.json'))) {
            fs.writeFile('config.json', data, (err) => {
                if(DEBUG) console.log('Data written to config.json file');
            });
        } else {
            if(DEBUG) console.log('config.json file already exists');
        }
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    initializeApp,
  }