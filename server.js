var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var aWss = expressWs.getWss('/');
var uuid = require('uuid/v4');
var Utils = require('./src/utils.js');

var utils = new Utils();

app.ws('/', (ws, req) => {

	if (!ws.id) {
		ws.id = uuid();
		
		// We have a new client! If there is an ongoing session, we oughta show a screen that's already syncd in with others.
		let lastMessage = utils.getLastMessage() 
		if (lastMessage) ws.send(JSON.stringify(lastMessage));
	}

	ws.on('message', function(msg) {

		// parse the message for JSON structure, complete the conversions and convert it back to string.
		msgJSON = JSON.parse(msg);
		utils.completeJSONVariable(msgJSON);
		msg = JSON.stringify(msgJSON);
		
		// broadcast it out to everyone!
		aWss.clients.forEach((client) => {
			client.send(msg)
		});
	
	});
});

app.listen(3000, () => console.log('Listening on port 3000'));