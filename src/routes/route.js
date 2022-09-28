//=====================Importing Module and Packages=====================//
const express = require('express');
const router = express.Router();
const { createUser, login } = require("../Controller/userController");
const { createBooks, getAllBook, getBooksByPathParam, updateBookbyId, deletebyId } = require("../Controller/bookController");
const { bookValidation, userValidation } = require("../Validator/validate")
const { createReview, updateReviewByBookId, deletebyreviewId } = require("../Controller/reviewController")
const { authentication, authorisation } = require("../middleware/auth")
const aws= require("aws-sdk");
//////////////////////////////////create User Api/////////////////////////////////////////////////////////////////////////////
router.post("/register", userValidation, createUser);
//////////////////////////////////Login Api/////////////////////////////////////////////////////////////////////////////
router.post("/login", login);


//////////////////////////////////create Books Api/////////////////////////////////////////////////////////////////////////////
router.post("/books", bookValidation, authentication,authorisation, createBooks);
//////////////////////////////////Get All Books  Api/////////////////////////////////////////////////////////////////////////////
router.get("/books",authentication, getAllBook);
//////////////////////////////////Get Books Details  Api/////////////////////////////////////////////////////////////////////////////
router.get("/books/:bookId",authentication, getBooksByPathParam);
//////////////////////////////////Update Books Api/////////////////////////////////////////////////////////////////////////////
router.put("/books/:bookId", authentication, authorisation, updateBookbyId);
//////////////////////////////////Delete Books Api/////////////////////////////////////////////////////////////////////////////
router.delete("/books/:bookId", authentication, authorisation, deletebyId)


//////////////////////////////////Create Reviews Api/////////////////////////////////////////////////////////////////////////////
router.post("/books/:bookId/review", createReview);
/////////////////////////////////Update Reviews Api/////////////////////////////////////////////////////////////////////////////
router.put("/books/:bookId/review/:reviewId", updateReviewByBookId)
    //////////////////////////////////Delete Reviews Api/////////////////////////////////////////////////////////////////////////////
router.delete("/books/:bookId/review/:reviewId", deletebyreviewId);




aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    // this function will upload file to aws and return the link
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  //HERE
        Key: "abc/" + file.originalname, //HERE 
        Body: file.buffer
        
    }
    

    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })

    // let data= await s3.upload( uploadParams)
    // if( data) return data.Location
    // else return "there is an error"

   })
}

router.post("/write-file-aws", async function(req, res){

    try{
        let files= req.files
        if(files && files.length>0){
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL= await uploadFile( files[0] )
            res.status(201).send({msg: "file uploaded succesfully", data: uploadedFileURL})
            console.log(files)
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }
        
    }
    catch(err){
        res.status(500).send({msg: err})
    }
    
})

router.all("/*", (req, res) => { res.status(400).send({ status: false, error: " please enter a valid request " }); });

//=====================Module Export=====================//
module.exports = router;