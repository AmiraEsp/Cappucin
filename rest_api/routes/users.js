var express = require('express');
var router = express.Router();
const userController = require("../controller/user.controller");

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.route('/:Identifier')
    .get(userController.getOneById)
    .put(userController.updateUserById)
    .delete(userController.deleteUserById);

module.exports = router;