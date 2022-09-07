const {Router} = require('express');

const {userRouter, errorRouter, loginRouter, signRouter} = require("./index");

const routes = Router();

routes.use('/users', userRouter);
routes.use('/error', errorRouter);
routes.use('/login', loginRouter);
routes.use('/signIn', signRouter);

routes.use((req, res) => {
    res.render('notFoundPage');
});

module.exports = routes;