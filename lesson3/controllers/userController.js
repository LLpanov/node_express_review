const users = require("../db/users");

class UserController {
    error;

    renderUsers({query}, res) {
        if (Object.keys(query).length) {
            let usersArray = [...users];
            if (query.city) {
                usersArray = usersArray.filter(user => user.city === query.city);
            }

            if (query.age) {
                usersArray = usersArray.filter(user => user.age === query.age);
            }

            res.render('users', {users: usersArray});
            return;

        }

        res.render('users', {users});
    }

    getById({params}, res) {
        const user = users.find(user => user.id === +params.userId);
        res.render('user', ({user}));
    }

    deleteById({body}, res) {
        users.splice(users.indexOf(body.id - 1), 1);
        res.redirect('/users');
    }
}

module.exports = new UserController();