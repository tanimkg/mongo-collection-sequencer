# mongo-collection-sequencer

#### A node module to generate sequence number against a specific key of a mongodb collection. 

MongoDB creates unique object id for each document. But often you need human readable id made of integer, for example: http://localhost:3000/users/12345. This module enumerates sequence for each collection and make the next number available to use while inserting new document, so that you can use this sequential id in your application without any hassle. 

# Installation

```
$ npm install mongo-collection-sequencer
```

# Usage

### Example
Generate the next sequence for a key named "userid":
```
var sequence = require('mongo-collection-sequencer').generate("userid");

exports.addUser = function(req,res,next){
	sequence.next(function(nextSeq){
		var verifyToken = require('randpassgen').generate(36);
		var userObj = {
			userid: nextSeq,
			fname: req.body.firstName,
			lname: req.body.lastname,
			password: req.body.pwd,
			email: req.body.email,
			status: "inactive",
			verifyToken: verifyToken
		};
		
    ...
    // other codes
    ...
    }
```
#### Note

You need to have a working mongodb connection.