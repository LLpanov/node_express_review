const users = require('../db/users');

function userMiddleware({params}, res, next) {
    try {
        const user = users.find(user => user.id === +params.userId);

        if (!user) {
            throw new Error('Такого користовича не існує або він був видаленний');
        }

        next();
    } catch ({message}) {
        res.redirect(`/error?error=${message}`);
    }
}

module.exports = userMiddleware;