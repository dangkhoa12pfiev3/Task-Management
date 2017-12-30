//service SILO USER
// manipulate collection user in database
// login (read) or register(create) operation 
var http = require("http");
var express = require("express");
var httpPort = 8082;
var app = express();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dburl = "mongodb://localhost:27017/user";

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//input: username,password
//output: id
app.post("/login",function(req,res){
    var success = true;
    var idUser;
	var errorSet = [];


	var username = req.body.username;
	var password = req.body.password;

	if(!username || !password){
		success = false;
		errorSet.push("MISSING_PARAMS");
	}

	if(success){
        searchForUsername(username,function(user){
            if(password != user.password){
                success = false;
                errorSet.push("USER_NOT_EXIST");
            }else{
                idUser = user._id;
            }
            res.send({
                success: success,
                idUser:idUser,
                errorSet: errorSet
            })
        });
	}
    
	
});

function searchForUsername(username,callback){
    return mongodb.connect(dburl)
        .then(function(db){
            var collection = db.collection("user");
            return collection.findOne({username:username})
        })
        .then(function(user){
            callback(user);
        })
}


//input: username,password
//output: id
app.post("/register",function(req,res){

    var success = true;
    var idUser;
	var errorSet = [];
    
    var username = req.body.username;
    var password = req.body.password;
    
	if(!username || !password){
		success = false;
		errorSet.push("MISSING_PARAMS");
    }
    
    if(success){
        var request = {
            username: username,
            password: password
        };

        addUser(request,function(user){
            idUser = user._id;
            res.send({
                success: success,
                idUser:idUser,
                errorSet: errorSet
            })
        })
    }
});


function addUser(request,callback){
    return mongodb.connect(dburl)
        .then(function(db){
            collection = db.collection("user");
            return collection.insert(request);
        })
        .then(function(user){
            callback(user.ops[0]);
        })
    
}

app.listen(httpPort);