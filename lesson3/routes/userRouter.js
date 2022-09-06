const {Router} = require('express');
const users = require('../db/users');
const userRouter = Router();

userRouter.get('/', ({query}, res) => {
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
});

module.exports = userRouter;