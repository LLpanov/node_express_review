const users = require('../db/users');

class loginController {
    getRegistration(req, res) {
        res.render('login');
    }

    getVarification({body}, res) {
        users.push({...body, id: new Date().getTime()});
        res.redirect('/users');
    }
}


module.exports = new loginController();