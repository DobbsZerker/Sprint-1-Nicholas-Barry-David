const fs = require('fs');
const path = require('path');


function configApp() {

    const myArgs = process.argv.slice(2);
        switch (myArgs[1]) {
            case '--show':
                showConfig();
                if(DEBUG) console.log('display the configuration file');
                break;
            case '--set':
                setConfig();
                if(DEBUG) console.log('configApp.setConfig() --set');
                break;
            case '--reset':
            resetConfig();
            if(DEBUG) console.log('configApp.resetConfig() --reset');
            default:
                if(DEBUG) console.log('Config - default');
        }
    }

    function showConfig() {
        if(DEBUG) console.log('display the configuration file');
                let viewConfig = fs.readFileSync('config.json');
                let viewConfigString = JSON.parse(viewConfig);
                console.log(viewConfigString);
    }

    function setConfig() {

    } 


module.exports ={ 
    configApp,
}