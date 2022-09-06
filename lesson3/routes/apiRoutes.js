const {Router} = require('express');
const userRouter = require('./userRouter');
const routes = Router();

routes.use('/users', userRouter);

module.exports = routes;