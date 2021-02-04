var express = require('express'),
cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
var route = require('./router/router.js');
 
const db = require('./config/db.config.js');
 
const Role = db.role;
 
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});
//adding middleware - cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

app.use(cors());
//adding routes
app.use('/api',route);
 
// Create a Server
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})
 
function initial() {
  Role.create({
    role_id: 1,
    role_name: "USER"
  });
 
  Role.create({
    role_id: 2,
    role_name: "OFFICER"
  });
 
  Role.create({
    role_id: 3,
    role_name: "ADMIN"
  });
}