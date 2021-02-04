//import modules
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');
    path = require('path');

var app = express();
var port = process.env.PORT || 3000;

//import database connection from dbconnect.js file
var mysql = require('./dbconnect/dbconnect');

//Parse as urlencoded and json.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//adding middleware - cors
app.use(cors());

//Http logger
app.use(morgan('dev'));

//Uncomment for production
//app.use(express.static(__dirname + '/public'));

// Point static path to public
//app.use(express.static(path.join(__dirname, 'public')));




app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

//import routes from /routes/routes.js
var  allRoutes = require('./routes/allRoutes');
    
//adding routes
app.use('/api', allRoutes);


// Catch all other routes and return the index file
//app.get('/*', (req, res) => { res.sendFile(path.join(__dirname, '/public/index.html'));
//});


app.listen(port, function() {console.log('Server started at http://localhost:'+port+'/');});







