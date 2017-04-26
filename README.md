# lcp-tools
When consuming APIs in the LCP, developers must use OAuth 2.0 Message Authentication Code (MAC) Tokens (draft 02) to authenticate themselves.

lcp-tools to the rescue!
use ```lcp-tools.LCPAuthHeader``` to get your authentication right.

# Example
``` js
var request = require("request");
var lcptools = require("lcp-tools")
var env = process.env.NODE_ENV || 'Prod_sandbox_common';
var config = require('../config')[env];
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
    		// Do stuff with 'body' here
		}
	);
```
