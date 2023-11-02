import { createServer } from 'https';
import unirest from 'unirest';
import { getRandom } from 'random-useragent';
import isUrl from "is-valid-http-url";
import { readFileSync } from "fs";

var httpsOptions = {
  key: readFileSync("server.key"),
  cert: readFileSync("server.cert"),
};

createServer(httpsOptions, function (req, res) {
    res.writeHead(200, {
        "Access-Control-Max-Age":3600,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range",
        "Content-Type": "application/json"
    });
    if (req.url.split("/?url=")[1] == undefined == false && isUrl(req.url.split("/?url=")[1]) == true && req.method === "GET") {
        unirest('GET', req.url.split("/?url=")[1])
            .headers({
                'user-agent': getRandom()
            })
            .end(function (resku) {
                res.end(resku.raw_body);
            });
    } else {
        res.end("error!, Example: https://origin.yourdomain.com/?url=https://www.yourdomain.com")
    };
}).listen(443);