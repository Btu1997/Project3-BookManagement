//=====================Importing Module and Packages=====================//
const express = require('express');
const router = express.Router();
const {createUser,login} = require("../Controller/userController");

router.post("/register", UserController.createUser);

router.post("/login", UserController.login);



router.all("/*", (req, res) => { res.status(404).send({ status: false, error: " / invalid - path params - provided / " }); });




//=====================Module Export=====================//
module.exports = router;   