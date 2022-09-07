const {Router} = require('express');

const errorRouter = Router();
const {errorController} = require("../controllers");

errorRouter.get('/', errorController.getError);

module.exports = errorRouter;