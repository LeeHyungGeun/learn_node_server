# learn_node_server
Learning Node Server

### Introduce how to run a default node server.

### 0. Install libraries on npm.
npm install http-proxy-server --save

### Examples

### 1. Default Server (demo: demo/1. http_server.js)
```javascript
var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    ROOT_DIR = './',
    port = 8000 || process.env.port;

http.createServer(createServer).listen(port);
function createServer (req, res) {
    var urlObj = url.parse(req.url, true, false);
    console.log(urlObj.pathname);
    urlObj.pathname = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname; // Default HTML document by '/'
    // Using fs module to provide HTML documents
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200, { 'content-type': 'text/html' });    // Which document it is
        res.end(data);
    });
}
```

### 2. Proxy API Server (demo: demo/1. http_proxy_server.js)
```javascript
var fs = require('fs'),
    http = require('http'),
    httpProxy = require('http-proxy'),  // Install http-proxy module
    proxy = httpProxy.createProxyServer({});    // Setting a proxy object
    url = require('url'),
    ROOT_DIR = './',
    apis = ['/api', '/api/list'],   // Which URL to set with Proxy API
    apiProxyUrl = 'http://localhost:8080',  // Proxy Server URL using with URL
    port = 8000 || process.env.port;

http.createServer(createServer).listen(port);
function createServer (req, res) {
    var urlObj = url.parse(req.url, true, false);
    console.log(urlObj.pathname);
    var regApis = new RegExp(apis.join('|'));
    if(regApis.test(urlObj.pathname)) { // if it is Proxy API's URL to use proxy module
        proxy.web(req, res, { target: apiProxyUrl });
    }
    else {  // default web server
        urlObj.pathname = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname;
        fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(data);
        });
    }
}
```

### 3. HTML Body Scrawler Server (demo: 3. http_request_html.js)
'''javascript
var http = require('http'),
    request = require('request'),   // import request module
    url = require('url'),
    port = 8000 || process.env.port;

http.createServer(createServer).listen(port);
function createServer (req, res) {
    var urls = url.parse(req.url);
    if (urls.query == null) {
        return false;
    }
    var uri = urls.query.split('url=')[1];
    uri = /http|https/.test(uri) ? uri : 'http://' + uri;   // if no protocol, to add a protocol with URL
    request(
        {
            method: 'GET',
            uri: uri
        },
        function (err, response, body) {
            console.log(body);
            res.writeHead(200, { 'content-type': 'text/html' })
            res.end(body);
        }
    );
}
// Reference: request https://github.com/request/request
'''