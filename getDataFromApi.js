const https = require('https');
const fs = require('fs');

https.get('https://jsonplaceholder.typicode.com/users', res => {
  let data = [];
  console.log('Status Code:', res.statusCode);
  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {

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