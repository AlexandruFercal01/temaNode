const http = require('http');
const https = require("https");
const fs = require("fs");
const util = require("util");
var path = require('path');

// Create a server object
http.createServer(function (req, res) {
	
	// http header
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	const url = req.url;
	
	if(url ==='/index') {
		fs.readFile(__dirname+"/index.html", function(err, data)
        {
            if(err){
                throw err;
            }
            res.write(data);
            res.end();
        });
	}
	else if(url ==='/callbackToPromise') {
		const filePath = __dirname+"/myFile0.json";
        const readFilePromise = util.promisify(fs.readFile);

        readFilePromise(filePath)
        .then(data => {res.write(data.toString())})
        .catch(err => {console.log(err)});
	}
    else if(url ==='/csvToJson') {
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
        
        fs.readFile(__dirname+"/myFile0.json", function(err, data){
            if(err){
                throw err;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            let json_data = JSON.parse(data);
            res.write(data);
            res.end();
            })
	}
    else if(url ==='/api') {
		https.get('https://jsonplaceholder.typicode.com/users', ress => {
        let data = [];
        console.log('Status Code:', res.statusCode);
        ress.on('data', chunk => {
            data.push(chunk);
        });

        ress.on('end', () => {

        const users = JSON.parse(Buffer.concat(data).toString());
        fs.writeFile(__dirname+"/APIdata.txt", data.toString(), err=>{
        if(err){
            throw err;
        }
        console.log("File saved succesfully");
        })
        for(user of users) {
        console.log(`Got user with id: ${user.id}, name: ${user.name}`);
        }
         });
        }).on('error', err => {
    console.log('Error: ', err.message);
    });
        res.write("Check the console");
        res.end();
	}
	else {
		res.write('Hello World!');
		res.end();
	}
}).listen(3000, function() {
	
	// The server object listens on port 3000
	console.log("server start at port 3000");
});
