var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
    database: 'deneb',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 3000
};
var pool = new pg.Pool(config);

//GET
//router.get
//PUT
//router.put
//DELETE
//router.delete
//POST
router.post('/', function(req,res){
var task = (req.body).objectIn;
console.log(task.objectIn);
pool.connect(function(errorConnecting, db, done){
    if(errorConnecting){
        console.log('Error connecting', errorConnecting);
        res.sendStatus(500);
    } else {
        var queryText = 'INSERT INTO "tasks" ("list", "complete", "task", "title", "date") VALUES ($1, $2, $3, $4, $5);';
        db.query(queryText, [task.list, task.complete, task.task, task.title, task.date], function (errorMakingQuery, result) {
            done();
            if (errorMakingQuery){
                console.log('Error making query ', errorMakingQuery);
                res.sendStatus(500);
            } else {
                //success!
                res.sendStatus(201);
            }
        });
    }
});//end pool
});//end of post

module.exports = router;
