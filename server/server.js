//requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var taskRouter = require('./router/task.js');


//global
var port = process.env.PORT || 5000;

//uses
app.use(bodyParser.urlencoded({extended:true}));
app.use( express.static('server/public'));
app.use('/task', taskRouter);

//spin up server
app.listen(port, function(){
    console.log('listening on port: ', port);
})