const users = require('../db/users');

class signInController {
    getSignIn(req, res) {
        res.render('sign');
    }

    postSignIn({body}, res) {
        const user = users.find(user => user.email === body.email && user.password.toString() === body.password);
        res.redirect(`/users/${user.id.toString()}`);
    }
}

module.exports = new signInController();x