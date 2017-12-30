//service PILOTE
//receive request from client and redirect to appropriate service SILO
var http = require("http");
var express = require("express");
var path = require("path");
var request = require("request");
var fs = require('fs');
var https = require('https');
var httpPort = 8080;
var httpsPort = 443;
var app = express();
var bodyParser = require('body-parser');

var options = {
	key: fs.readFileSync('./ssl/taskMngWeb.key'),
	cert: fs.readFileSync('./ssl/taskMngWeb.crt')
}
//init parser
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"./public")));



app.post("/",function(req,res){

	url = "http://localhost:8081/load";
	
	request.post({
		headers: {'content-type' : 'application/json'},
		url:     url,
		body:    JSON.stringify(req.body)
	  }, function(error, response, body){
			res.send(JSON.parse(body));
	  });
})
	
app.post("/add",function(req,res){
	console.log(req.body);
	url = "http://localhost:8081/add";
	
	request.post({
		headers:	{'content-type':'application/json'},
		url:		url,
		body:		JSON.stringify(req.body)
	},function(error,response,body){
		res.send(JSON.parse(body));
	})
})

		
app.post("/modify",function(req,res){
	url = "http://localhost:8081/modify";
	
	request.post({
		headers:	{'content-type':'application/json'},
		url:		url,
		body:		JSON.stringify(req.body)
	},function(error,response,body){
		res.send(JSON.parse(body));
	})
})

app.post("/delete",function(req,res){
	url = "http://localhost:8081/delete";
	
	request.post({
		headers:	{'content-type':'application/json'},
		url:		url,
		body:		JSON.stringify(req.body)
	},function(error,response,body){
		res.send(JSON.parse(body));
	})
})


app.post("/login",function(req,res){
	//invoke serviceSILOUSer

	url = "http://localhost:8082/login";
	
	request.post({
		headers: {'content-type' : 'application/json'},
		url:     url,
		body:    JSON.stringify(req.body)
	  }, function(error, response, body){
			res.send(JSON.parse(body));
	  });
})

app.post("/register",function(req,res){
	//invoke serviceSILOUSer

	url = "http://localhost:8082/register";
	
	request.post({
		headers: {'content-type' : 'application/json'},
		url:     url,
		body:    JSON.stringify(req.body)
	  }, function(error, response, body){
			res.send(JSON.parse(body));
	  });
})

http.createServer(app).listen(httpPort);
https.createServer(options,app).listen(httpsPort);