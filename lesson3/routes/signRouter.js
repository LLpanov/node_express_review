const {Router} = require('express');
const {signInController} = require("../controllers");
const {signInMiddleware} = require("../middleware");

const signInRouter = Router();

signInRouter.get('/', signInController.getSignIn);
signInRouter.post('/', signInMiddleware, signInController.postSignIn);


module.exports = signInRouter;