const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
//const logEvents = require('./logEvents');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter{};
const myEmitter = new MyEmitter();
const {format} = require('date-fns');
const {v4:uuid} = require('uuid');
myEmitter.on('log', (msg)=> logEvents(msg));
setTimeout(()=>{
    myEmitter.emit('log', 'Log event emitted!');
}, 2000);
// myEmitter.on("log", (level, message) => {
//     console.log(' * ' + level.toUpperCase() + ' * ' + message);
//   });



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
App token --add        Adds a user 
App token --gentoken      Generate a new token for the user
App token --update phone <user> Updates phone number of user
App token --update email <user> Updates email address of user
App token --show all        Shows all users and tokens
App token --search <User, phone or email>`;


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
            myEmitter.emit("log", ' start up views ', "All Created");
            break;
        case '--cat':
            createConfig();
            if(DEBUG) console.log('initializeApp.createInit() --cat');
            myEmitter.emit("log", ' start up users ', "Woohoo");
            break;
        case '--mk':
        createFolder()
        if(DEBUG) console.log('initializeApp.createFolder() --mk');
        case '--help':
            default:
            fs.readFile(__dirname + '/views/init.txt', (error, data) => {
            if(error) throw error;
            console.log(data.toString());
        });
            myEmitter.emit("log", ' fingers crossed ', "Fall Back");
    }
}


function createInit() {
    if(fs.existsSync(path.join(__dirname, './views'))) {
        fs.writeFile(path.join(__dirname, 'views', 'init.txt'), init, (err) => {
            if(err) console.log(err);
            else if(DEBUG) console.log('Data written to init.txt file');
            myEmitter.emit("log", ' info init ', "Welcome to Initialization File");
        });
    }
    if(fs.existsSync(path.join(__dirname, './views'))) {
        fs.writeFile(path.join(__dirname, 'views', 'config.txt'), configUsage, (err) => {
            if(err) console.log(err);
            else if(DEBUG) console.log('Data written to config.txt file');
            myEmitter.emit("log", ' info config ', "Welcome to ConFig.txt File");
        });
    }
    if(fs.existsSync(path.join(__dirname, './views'))) {
        fs.writeFile(path.join(__dirname, 'views', 'token.txt'), tokenUsage, (err) => {
            if(err) console.log(err);
            else if(DEBUG) console.log('Data written to token.txt file');
            myEmitter.emit("log", ' info token ', "Welcome to Token.txt File");
        });
    }
    if(fs.existsSync(path.join(__dirname, './views'))) {
        fs.writeFile(path.join(__dirname, 'views', 'usage.txt'), usagetxt, (err) => {
            if(err) console.log(err);
            else if(DEBUG) console.log('Data written to usage.txt file');
            myEmitter.emit("log", ' info usage ', "Welcome to Usage.txt File");
        });
    }
    let tokensjson = "[]"
    if(!fs.existsSync(__dirname, '/users/tokens.json')) {
        fs.writeFile(path.join(__dirname, 'users', 'tokens.json'), tokensjson,  (err) => {
            if(err) console.log(err);
            if(DEBUG) console.log('array made')
            myEmitter.emit("log", ' array made ', "Awesome");
        });
    } else{
        if(DEBUG) console.log('Array already made')
        myEmitter.emit("log", ' array already made ', "Slow Down Sunshine");
    }
 }






 function createFolder() {
    fs.mkdir(path.join(__dirname, 'views'), (err) => {
        if(err) console.log(err);
        else if(DEBUG) console.log('Views directory created.');
        myEmitter.emit("log", ' views ', "Can you see it?");
    });
    fs.mkdir(path.join(__dirname, 'logs'), (err) => {
        if(err) console.log(err);
        else if(DEBUG) console.log('Logs directory created.');
        myEmitter.emit("log", ' logs ', "Logging Data?");
    });
    fs.mkdir(path.join(__dirname, 'users'), (err) => {
        if(err) console.log(err);
        else if(DEBUG) console.log('Users directory created.');
        myEmitter.emit("log", ' users ', "We have lots!");
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
                myEmitter.emit("log", ' config.json ', "Write away!");
            });
        } else {
            if(DEBUG) console.log('config.json file already exists');
            myEmitter.emit("log", ' config again ', "Already Written");
        }
    } catch(err) {
        console.error(err);
    }
}





const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        await fsPromises.appendFile(path.join(__dirname, './logs', 'eventLog.txt'), logItem);
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    initializeApp,
    logEvents,
  }