const {Router} = require('express');
const {userController} = require("../controllers");
const {userMiddleware} = require("../middleware");

const userRouter = Router();

userRouter.get('/', userController.renderUsers);
userRouter.get('/:userId', userMiddleware, userController.getById);
userRouter.post('/:userId', userController.deleteById);

module.exports = userRouter;