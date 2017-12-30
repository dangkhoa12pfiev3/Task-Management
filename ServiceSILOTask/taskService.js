// service SILO TASK
// manipulate collection task in database
// CRUD operation 
var http = require("http");
var express = require("express");
var httpPort = 8081;
var app = express();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = "mongodb://localhost:27017/task";

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


//input: idUser
//output: list task of that user task{Id,IdUser,task,state}
app.post("/load",function(req,res){
    console.log(req.body);
    var idUser = req.body.idUser;
    
    return mongodb.connect(dburl)
        .then(function(db){
            var collection = db.collection("task");
            var listTask = collection.find({idUser: idUser}).toArray();
            db.close();
            return listTask;
        })
        .then(function(items){
            res.send({
                success:true,
                data: items
            })
        })
})

//input: object task{idUser,task,state}
//output: id of taskInserted
//return to client id of new task so client can manipulate its own taskList
app.post("/add",function(req,res){
    var task = req.body;

    return mongodb.connect(dburl)
        .then(function(db){
            var collection = db.collection("task");
            collection.insertOne(task)
            .then(function(response){
                var insertedTask = response.ops[0];
                db.close();
                res.send({
                    success:true,
                    insertedTaskId: insertedTask._id
                })
        })
    })
})


//input: object task{_id,state}
//change state: todo -> done or done->todo
app.post("/modify",function(req,res){
    var task = req.body;
    console.log(task);
    return mongodb.connect(dburl)
        .then(function(db){
            var collection = db.collection("task");
            var query = {_id: new mongodb.ObjectID(task._id)};
            var newValue = { $set: {state: getNewState(task.state)} };
            collection.findOneAndReplace(query,newValue)
            .then(function(response){
                db.close();
                res.send({
                    success:true
                })
            })         
        })
})

//input: object task{_id}
app.post("/delete",function(req,res){

    var task = req.body;

    return mongodb.connect(dburl)
        .then(function(db){
            var collection = db.collection("task");
            var query = {_id: new mongodb.ObjectID(task._id)};
            collection.findOneAndDelete(query)
            .then(function(response){
                db.close();
                res.send({
                    success:true,
                })
            })    
        })
       
})

function getNewState(oldState){
    if(oldState == "todo")
        return  "done";
    else
        return "todo";
}

app.listen(httpPort);