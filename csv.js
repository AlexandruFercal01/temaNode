var http = require("http");
var fs = require('fs');
var path = require('path');


var filePath = path.join(__dirname, 'myFile0.csv');

var f = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
    function(err){console.log(err);});

f = f.split("\n");

headers = f.shift().split(",");

var json = [];    
f.forEach(function(d){
    tmp = {}
    row = d.split(",")
    for(var i = 0; i < headers.length; i++){
        tmp[headers[i]] = row[i];
    }
    json.push(tmp);
});

var outPath = path.join(__dirname, 'myFile0.json');

fs.writeFileSync(outPath, JSON.stringify(json), 'utf8', 
    function(err){console.log(err);});

    fs.readFile(__dirname+"/myFile0.json", function(err, data){http.createServer(function(req, res){
        if(err){
            throw err;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        let json_data = JSON.parse(data);
        res.write(data);
        res.end();
    }).listen(8080);})