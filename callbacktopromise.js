const fs = require('fs');

const util = require('util');

const filePath = __dirname+"/myFile0.json";
const readFilePromise = util.promisify(fs.readFile);

readFilePromise(filePath)
  .then(data => {console.log(JSON.parse(data))})
  .catch(err => {console.log(err)});