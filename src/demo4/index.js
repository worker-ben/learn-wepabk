const util = require('./utils');

console.log(util.oneNumber);

setInterval(() => {
  console.log('In index.js', util.oneNumber);
},1000);