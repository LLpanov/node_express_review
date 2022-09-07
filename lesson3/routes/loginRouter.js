const {Router} = require('express');
const {loginController} = require("../controllers");
const {loginMiddleware, emailPasswordMiddleware} = require("../middleware");

const loginRouter = Router();

loginRouter.get('/', loginController.getRegistration);
loginRouter.post('/', loginMiddleware,emailPasswordMiddleware, loginController.getVarification);


module.exports = loginRouter;