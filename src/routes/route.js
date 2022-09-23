//=====================Importing Module and Packages=====================//
const express = require('express');
const router = express.Router();
const {createUser,login} = require("../Controller/userController");
const {createBooks,getAllBook,getBooksByPathParam,updateBookbyId,deletebyId} = require("../Controller/bookController");
const {bookValidation,userValidation} = require("../Validator/validate")
const {authentication,authorisation} = require("../middleware/auth")


router.post("/register",userValidation,createUser);

router.post("/login", login);

router.post("/books",bookValidation, createBooks);
router.get("/books",getAllBook);
router.get("/books/:bookId",getBooksByPathParam);
router.put("/books/:bookId",updateBookbyId);
router.delete("/books/:bookId",deletebyId)
router.all("/*", (req, res) => { res.status(404).send({ status: false, error: " / invalid - path params - provided / " }); });




//=====================Module Export=====================//
module.exports = router;   