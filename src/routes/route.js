const express= require('express');
const router= express.router();
//=============================================================================================================







router.all("/*", (req, res) => { res.status(404).send({ status: false, error: " / invalid - path params - provided / " }); });


module.exports = router;
