const jwt = require('jsonwebtoken');

const secret = 'asdfasdf1234asdf';

const token = jwt.sign(
    {
        id: 'userId',
        isAdmin: true,
    },
    secret,
    { expiresIn: 2 }
);

jwt.verify(token, secret, (err, decoded) => {
    console.log(err, decoded);
});
