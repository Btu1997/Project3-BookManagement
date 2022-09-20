//=====================Importing Module and Packages=====================//
const express = require('express');
const router = express.Router();


router.all("/*", (req, res) => { res.status(404).send({ status: false, error: " / invalid - path params - provided / " }); });






//=====================Module Export=====================//
module.exports = router;   