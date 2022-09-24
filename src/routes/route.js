//=====================Importing Module and Packages=====================//
const express = require('express');
const router = express.Router();
const { createUser, login } = require("../Controller/userController");
const { createBooks, getAllBook, getBooksByPathParam, updateBookbyId, deletebyId } = require("../Controller/bookController");
const { bookValidation, userValidation } = require("../Validator/validate")
const { createReview, updateReviewByBookId, deletebyreviewId } = require("../Controller/reviewController")
const { authentication, authorisation } = require("../middleware/auth")


router.post("/register", userValidation, createUser);

router.post("/login", login);

router.post("/books", bookValidation, authentication, authorisation, createBooks);
router.get("/books", getAllBook);
router.get("/books/:bookId", getBooksByPathParam);
router.put("/books/:bookId", updateBookbyId);
router.delete("/books/:bookId", deletebyId)

router.post("/books/:bookId/review", createReview);
router.put("/books/:bookId/review/:reviewId", updateReviewByBookId)
router.delete("/books/:bookId/review/:reviewId", deletebyreviewId);

router.all("/*", (req, res) => { res.status(400).send({ status: false, error: " please enter a valid request " }); });




//=====================Module Export=====================//
module.exports = router;