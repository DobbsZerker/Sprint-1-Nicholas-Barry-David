const crc32 = require('crc/crc32');
const { format } = require('date-fns');
const fs = require('fs');
const { dirname } = require('path');
const path = require('path');
function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }




const myArgs = process.argv.slice(2);
function tokenApp() {

    
        switch (myArgs[1]) {
            case '--show':
                showTokens();
                if(DEBUG) console.log('display the tokens');
                break;
            case '--add':
                adduser(myArgs[2]);
                if(DEBUG) console.log('tokenApp.setusername() --set');
                break;
            case '--update':
                updateData(myArgs);
                if(DEBUG) console.log('tokenApp.updateData() --update');
            case '--token':
                genToken(myArgs[2]);
                if(DEBUG) console.log('tokenApp.genToken() --token')
               
            default:
                if(DEBUG) console.log('Token - default');
        }
    }






function adduser(user) {

    let username = user;
    let crc = crc32(username).toString(16);
    let now = new Date();
    let expires = addDays(now, 3)
    let newToken = JSON.parse(`{
        "created": "2022-01-01 10:30:00",
        "username": "username",
        "phone": "7091234567",
        "token": "token",
        "expires": "2022-01-04 10:30:00",
        "confirmed": "tbd" 
        
    
    }`)
    
    newToken.created = now;
    newToken.username = username;
    newToken.email = "null";
    newToken.phone = "null";
    newToken.token = crc;
    newToken.expires = expires;
    
    if(fs.existsSync(path.join(__dirname, './users'))){
        let userTokens = fs.readFileSync(path.join(__dirname, 'users', 'tokens.json'));
        console.log(userTokens)
        let tokens = JSON.parse(userTokens);
        tokens.push(newToken);
        userTokens = JSON.stringify(tokens);
        fs.writeFile(path.join(__dirname, 'users', 'tokens.json'), userTokens,  (err) => {
          if(err) console.log(err);
         // else if(DEBUG) console.log('tokens.json file created');
     });
    }
   

} 

function updateData(myArgs) {
    if(DEBUG) console.log('token.updateData()');
    if(DEBUG) console.log(myArgs);
    fs.readFile(__dirname + '/users/tokens.json', (error, data) =>{
        if(error) throw error;
        let tokens = JSON.parse(data);
        tokens.forEach(object =>{
            if(object.username === myArgs[3]) {
                switch (myArgs[2]) {
                case 'phone':
                    object.phone = myArgs[4];
                    break;
                case 'email':
                    object.email = myArgs[4]; 
                    break;
                    default:       


                }
            }
        });
        userTokens = JSON.stringify(tokens);
        fs.writeFile(__dirname + '/users/tokens.json', userTokens, (err) => {
            if(err) console.log(err);
            else {
                console.log(`data record for ${myArgs[3]} was updated with ${myArgs[4]}.`)
            }
        })
    })

}

function genToken(username){
    if(DEBUG) console.log('token.genToken');

    let newToken = JSON.parse(`{
        "created": "2022-01-01 10:30:00",
        "username": "username",
        "phone": "7091234567",
        "token": "token",
        "expires": "2022-01-04 10:30:00",
        "confirmed": "tbd" 
        
    
    }`);
    let now = new Date();
    let expires = addDays(now, 3);

    newToken.created = `${format(now, 'yyyy-MM-dd HH:mm:ss')}`;
    newToken.username = username;
    newToken.token = crc32(username).toString(16);
    newToken.expires = `${format(expires, 'yyyy-MM-dd HH:mm:ss')}`;

    fs.readFile(__dirname + '/users/tokens.json', (error, data)=> {
        if(error) throw error;
        let tokens = JSON.parse(data);
        tokens.push(newToken);
        userTokens = JSON.stringify(tokens);

        fs.writeFile(__dirname + '/users/tokens.json', userTokens, (error) =>{
            if(error) console.log(error);
            else {
                console.log(`New token ${newToken.token} was created for ${username}.`);

            }
            
        })
        return newToken.token;
    })

}

function showTokens(){
    if(DEBUG) console.log('token.showTokens()')
    fs.readFile(__dirname + '/users/tokens.json', (error, data)=>{
        if(error) throw error;
        let tokens = JSON.parse(data);
        console.log(' Users and Tokens:')
        tokens.forEach(object => {
            console.log('--> User: ' + object.username + ' Token: ' + object.token);
        })
    })

}

   

module.exports ={ 
    tokenApp,
}
