const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

/**
 * This is all you need, easy way
 */

var data = {
    id: 4
};

var token = jwt.sign(data, '123abc');
console.log(token);
var decoded = jwt.verify(token, '123abc')
console.log(decoded);

//hard way
var message = "I am user number 3";
var hash = SHA256(message).toString(); 

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};



var resultHash = SHA256(JSON.stringify(token.data) + 'somesevret').toString();

if(resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust');
}
