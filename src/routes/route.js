//=====================Importing Module and Packages=====================//
const express = require('express');
const router = express.Router();
const {createUser,login} = require("../Controller/userController");
<<<<<<< HEAD

<<<<<<< HEAD
router.post("/register", UserController.createUser);

router.post("/login", UserController.login);
=======
router.post("/register",createUser)
router.post("/login", login);
>>>>>>> c59f832 (required dependencies done)
=======


router.post("/register", createUser);

router.post("/login", login);
>>>>>>> bb5f255 ( create Api)







//=====================Module Export=====================//
module.exports = router;   