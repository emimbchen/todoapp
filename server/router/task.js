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
var poolModule = require('../modules/pool.js');
var pool = poolModule;

//GET
router.get('/', function(req, res){
    pool.connect(function(errorConnecting, db, done){
        if(errorConnecting){
            console.log('Error connecting ', errorConnecting);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT * FROM "tasks" ORDER BY "id" ASC;';
            db.query(queryText, function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log('errorMakingQuery', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });//end of pool
});//end of get

//edit task PUT
router.put('/edit/:id', function (req, res) {
    var id = req.params.id;
    var status = req.body;
    console.log(id);
    pool.connect(function (errorConnecting, db, done) {
        if (errorConnecting) {
            console.log('Error connecting', errorConnecting);
            res.send(500);
        } else {
            var queryText = 'UPDATE "tasks" SET "task" = $1 WHERE "id" =' + id + ';';
            db.query(queryText, [status.task], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log(errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });//end pool
});//end put route
//PUT
router.put('/:id', function(req, res){
    var id = req.params.id;
    var status = req.body;
    console.log(id);
    pool.connect(function(errorConnecting, db, done){
        if(errorConnecting){
            console.log('Error connecting', errorConnecting);
            res.send(500);
        } else {
            var queryText = 'UPDATE "tasks" SET "complete" = $1 WHERE "id" ='+ id +';';
            db.query(queryText,[status.complete], function(errorMakingQuery, result){
                done();
                if(errorMakingQuery){
                    console.log(errorMakingQuery);
                    res.sendStatus(500);
                } else{
                    res.sendStatus(201);
                }
            });
        }
    });//end pool
});//end put route
//DELETE
router.delete('/:id', function(req,res){
    var id = req.params.id;
    console.log(id);
    pool.connect(function(errorConnecting, db, done){
        if(errorConnecting){
            console.log('Error connecting', errorConnecting);
            res.send(500);
        } else {
            var queryText = 'DELETE FROM "tasks" WHERE ("listid" =' + id +') OR ("id" = '+ id +');';
            db.query(queryText, function(errorMakingQuery, result){
            done();
            if(errorMakingQuery){
                console.log('Error making Query ', errorMakingQuery);
                res.sendStatus(500);
            } else {
                //success!
                res.sendStatus(201);
            }
        });
    }
    });//end of pool
});//end of delete

//POST route to accept list name
router.post('/', function(req,res){
var task = (req.body).objectIn;
pool.connect(function(errorConnecting, db, done){
    if(errorConnecting){
        console.log('Error connecting', errorConnecting);
        res.sendStatus(500);
    } else {
        var queryText = 'INSERT INTO "tasks" ("list", "complete", "task", "title", "listid") VALUES ($1, $2, $3, $4, $5);';
        db.query(queryText, [task.list, task.complete, task.task, task.title, task.listid], function (errorMakingQuery, result) {
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
