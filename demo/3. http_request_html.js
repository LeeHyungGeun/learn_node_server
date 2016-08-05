var http = require('http'),
    request = require('request'),
    url = require('url'),
    port = 8000 || process.env.port;

http.createServer(createServer).listen(port);
function createServer (req, res) {
    var urls = url.parse(req.url);
    if (urls.query == null) {
        return false;
    }
    var uri = urls.query.split('url=')[1];
    uri = /http|https/.test(uri) ? uri : 'http://' + uri;
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