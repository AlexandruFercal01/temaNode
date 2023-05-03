const https = require('https');

https.get('https://jsonplaceholder.typicode.com/users', res => {
  let data = [];
  console.log('Status Code:', res.statusCode);
  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    const users = JSON.parse(Buffer.concat(data).toString());

    for(user of users) {
      console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    }
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});