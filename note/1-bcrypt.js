const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'asdf1234';

const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);

const result = bcrypt.compareSync('1234', hash);
console.log(result);
