const users = require('../db/users');

function signInMiddleware({body}, res, next) {
    try {
        const checkStatus = users.find(user => user.password === body.password && user.email === body.email);
        if (!checkStatus) {
            throw new Error('не правильний емейл або пароль');
        }
        next();

    } catch ({message}) {
        res.redirect(`/error?error=${message}`);

    }

}

module.exports = signInMiddleware;