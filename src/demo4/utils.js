
var oneNumber = 1;

// 定时改变
setInterval(() => {
  oneNumber += 1;
  console.log('In utils.js', oneNumber);
}, 1000);

module.exports = {
  oneNumber: oneNumber
}