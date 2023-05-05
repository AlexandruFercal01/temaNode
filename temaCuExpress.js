const express = require("express");
const fs = require("fs");
const util = require("util");
const https = require("https");

const app = express();
const PORT = (8000);

//exercitiu 1
app.get("/index", (req, res)=>{
    fs.readFile(__dirname+"/index.html", (err, data)=>{
        if(err){
            throw err;
        }
        res.set('Content-Type', 'text/html');
        res.send(data);

    })    
})

app.get("/callbackToPromise", (req, res)=>{
    const readFilePromise = util.promisify(fs.readFile);
    readFilePromise(__dirname+"/myFile0.json")
    .then(data=>{res.send(data.toString())})
    .catch(err=>{console.log(err)})
})

app.get("/csvToJson", (req, res)=>{
    let file = fs.readFileSync(__dirname+"/myFile0.csv", {encoding:"utf-8"}, (err)=>{
        console.log(err);
    })
    file = file.split("\n");
    headers =file.shift().split(",");
    let json=[];
    file.forEach(function(d){
        tmp = {}
        row = d.split(",")
        for(var i = 0; i < headers.length; i++){
            tmp[headers[i]] = row[i];
        }
        json.push(tmp);
    });
    
    fs.writeFileSync(__dirname + "myFile0.json", JSON.stringify(json), 'utf8', 
        (err)=>{console.log(err);});
    fs.readFile(__dirname+"/myFile0.json", (err, data)=>{
        if(err){
            throw err;
        }
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);    
    })
})

app.get("/api", (req, res)=>{
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
            res.send("Check the console");
        }
)

app.listen(PORT, (err)=>{
    if(err){
        console.log("Server couldn't start correctly:" ,err);
    }
    else{
        console.log("Server started on port 8000.");
    }
})