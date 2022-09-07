const users = require('../db/users');

function checkEmailPassword({body}, res, next) {
    try {
        const checkEmail = users.some(user => user.email === body.email);
        if (checkEmail) {
            throw new Error('такий емейл вже існує');
        }
        next();
    } catch ({message}) {
        res.redirect(`/error?error=${message}`);
    }

}

module.exports = checkEmailPassword;



