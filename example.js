
var request = require("request");
var lcptools = require("./app.js")
var env = process.env.NODE_ENV || 'Prod_sandbox_common';
var config = require('../config')[env];

////////// POST EXAMPLE MV (sandbox production)


var macId = config.macId;
var macKey	= config.macKey; 
var method =   "POST";
var server =  config.server; 
var path = config.path; 
var request_body = config.request_body; 
var url = "https://" + server + path;

var authHeader = lcptools.LCPAuthHeader(macId, macKey, method, server,path,request_body);



var options = {
    url: url,
    method: 'POST',
    headers: {
    			'Content-Type': 'application/json',
    			'Authorization': authHeader
			},
    body: request_body
};



request(options, function (error, response, body) {
    				if (!error && response.statusCode == 201) {
    		    	console.log(body);
    				}
				}
	);