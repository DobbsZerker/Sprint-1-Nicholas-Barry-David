const fs = require('fs');
const path = require('path');

const myArgs = process.argv.slice(2);
function configApp() {

    
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
        let configfile = fs.readFileSync('config.json');
        // if(error) throw (error);
        if(DEBUG) console.log(JSON.parse(configfile))
        let data = JSON.parse(configfile)
        for (let key of Object.keys(data)){
            if (key === myArgs[2]) {
                data[key] = myArgs[3];
                match = true;
            }
        }
        if (!match) {
            console.log(`invalid key: ${myArgs[2]}, try another`)
        }
        if(DEBUG) console.log(data);
        configfile = JSON.stringify (data, null, 2);
        fs.writeFile(__dirname + '/config.json', configfile, (error) =>{
            // if (error) throw error;
            if(DEBUG) console.log('config file updated.');
        })

    } 


module.exports ={ 
    configApp,
}