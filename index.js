var https = require('https');
var unirest = require('unirest');
var random_useragent = require('random-useragent');
const isUrl = require("is-valid-http-url");
const fs = require("fs");

var httpsOptions = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

https.createServer(httpsOptions, function (req, res) {
    res.writeHead(200, {
        "Access-Control-Max-Age": 3600,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range",
        "Content-Type": "application/json"
    });
    if (req.url.split("/?url=")[1] == undefined == false && isUrl(req.url.split("/?url=")[1]) == true && req.method === "GET") {
        unirest('GET', req.url.split("/?url=")[1])
            .headers({
                'user-agent': random_useragent.getRandom()
            })
            .end(function (resku) {
                res.end(resku.raw_body);
            });
    } else {
        res.end("error!, Example: https://cors.yourdomain.com/?url=https://www.yourdomain.com")
    };
}).listen(443);
