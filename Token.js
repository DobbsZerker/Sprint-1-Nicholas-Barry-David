const crc32 = require('crc/crc32');
const { format } = require('date-fns');
const fs = require('fs');
const path = require('path');


function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

let username = 'user';
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
newToken.email = "user@example.com";
newToken.phone = "7091234567";
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
// let userTokens = fs.readFileSync(__dirname, './users', 'tokens.json','utf-8');
// let tokens = JSON.parse(userTokens);
// tokens.push(newToken);
// //console.log(tokens);
// userTokens = JSON.stringify(tokens);
// //console.log(userTokens);

// fs.writeFile('tokens.json', userTokens, (err) => {
//     if (err) console.log(err);
//     else console.log(fs.readFileSync("./users./tokens.json", "utf8"));
//   });
// // //let userTokens =  "" //fs.readFileSync('tokens.json');    //fs.readFileSync(path.join(__dirname, 'users', 'tokens.json'));
// // let tokens = ""  //JSON.parse(userTokens);
// // tokens.push(newToken);
// // userTokens = JSON.stringify(tokens);
// // fs.writeFile('tokens.json', userTokens, (err) => {
// //     if (err) console.log(err);
// //     else console.log(fs.readFileSync("tokens.json", "utf8"));
// //   });

