const bookModel = require("../model/bookModel");
const userModel= require("../model/userModel");
const moment = require("moment");

const createBooks = async function(req,res) {
    try {
      let data = req.body;
      let CurrentDate = moment().format("DD MM YYYY hh:mm:ss");

      let userDetails = await userModel.findById(data["userId"]);

      
      if (!userDetails) {
        return res.status(400).send({ status: false, msg: " User does not Exist." });
      }
  
      
      if (data["isdeleted"] == true) {
        data["deletedAt"] = CurrentDate;
      }
      
      let newbook= await bookModel.create(data)
      res.status(201).send({status:true,msg:"success", data: newbook})
    }
     catch (error) {
         res.status(500).send({ status: false, error: error.message });
       }
}

module.exports={createBooks};



      /*Create a book document from request body. Get userId in request body only.
Make sure the userId is a valid userId by checking the user exist in the users collection.
Return HTTP status 201 on a succesful book creation. Also return the book document. The response should be a JSON object like this
Create atleast 10 books for each user
Return HTTP status 400 for an invalid request with a response body*/