global.DEBUG = true;
const http = require('http');
const { parse } = require('querystring');
const { genToken } = require('./Token');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        formsubmit(req, result => {
            console.log(result);
            console.log(result.username);
            var madeToken = genToken(result.username);
            console.log(madeToken)
            res.end(`New User: ${result.username} Token generated: ${madeToken}`);
        });
    }
    else{
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="username" /> <br />
                    <button>save</button>
                </form>
            </body>
            </html>
        `);
    }
});

server.listen(3000);


function formsubmit(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded'
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', page => {
            body += page.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null)
    }
}

