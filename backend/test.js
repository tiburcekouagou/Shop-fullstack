const crypto = require('crypto');

console.log(crypto.randomBytes(64).toString('hex'))
console.log("UUID", crypto.randomUUID());
