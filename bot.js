// Modules
var HTTPS = require('https');
var cool = require('cool-ascii-faces');

// Get the Bot Id
var botID = process.env.BOT_ID;

// Get request and post response
function respond() {
    // User post
    var request = JSON.parse(this.req.chunks[0]);

    // Has text
    if (request.text) {
        // Convert to lowercase and remove extra spaces
        var text = request.text.toLowerCase().trim();
        console.log("Request: " + request);

        // Has 'jarvis'
        var index = text.indexOf("jarvis");
        if (index > -1) {
            this.res.writeHead(200);
            postMessage("You rang?");
            this.res.end();
        }
        else {
            console.log("Request didn't say my name!")
        }
    } else {
        console.log("Request did not have text.");
        this.res.writeHead(200);
        this.res.end();
    }

    /*
    //if (request.text && (request.text.indexOf("/cool guy") > -1)) {
        this.res.writeHead(200);
        var response = cool();
        postMessage(response);
        this.res.end();
    // ''
    } else {
        console.log("don't care");
        this.res.writeHead(200);
        this.res.end();
    }
    */
}

// Post message to GroupMe
function postMessage(botResponse) {
    var options, body, botReq;

    // Set post
    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };
    body = {
        "bot_id" : botID,
        "text" : botResponse
    };

    // Write to console
    console.log('sending ' + botResponse + ' to ' + botID);

    botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
    });

    // Catch errors
    botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
    });
    botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
}


exports.respond = respond;