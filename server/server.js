const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// var cors = require('cors')
var sockets =[]


// app.use(function(req, res, next) {
//     console.log('Middleware getting hit')
//     res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like http://localhost:4200
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });

var port = 8000;

wss.on('connection', function connection(ws) {
    sockets.push(ws)
    // handleIncomingSocket(ws)
    ws.on('message', function incoming(req) {
        handleRequest(req)
    });
    ws.send('something');
});




app.post('/issueCommand', (req, res) => {
    for(let s of sockets){
        s.send(JSON.stringify(req.body))
    }
    res.send(JSON.stringify({success: 'true'}))
});



const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
    projectId: 'arduino-8a3a6',
    keyFilename: './key/key.json',
});





function handleRequest(req){
    req = JSON.parse(req)

    if(req.action == 'reportState'){
        registerState(req);
    }
}


function registerState(req){
    firestore.collection('nodeStates').doc().set({
        'deviceId': req.deviceId,
        'temperature': req.temperature,
        'humidity': req.humidity,
        'brightness': req.brightness,
        'reportedAt': +new Date()
    }).then(()=>{
        console.log('Temperature record successfully inserted into database.')
    }).catch((err)=>{
        console.log('Error while writing into database: ' + err)
    })
}

app.listen(port);


