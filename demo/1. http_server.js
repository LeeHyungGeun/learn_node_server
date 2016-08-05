var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    ROOT_DIR = './',
    port = 8000 || process.env.port;

http.createServer(createServer).listen(port);
function createServer (req, res) {
    var urlObj = url.parse(req.url, true, false);
    console.log(urlObj.pathname);
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
