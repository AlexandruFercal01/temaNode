var http = require("http");
var fs = require("fs");



fs.readFile(__dirname+"/index.html", function(err, data){http.createServer(function(req, res){
    if(err){
        throw err;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
}).listen(8080);})
