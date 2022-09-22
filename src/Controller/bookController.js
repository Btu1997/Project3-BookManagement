const bookModel = require("../model/bookModel");
const userModel= require("../model/userModel");
const moment = require("moment");

const createBooks = async function(req,res) {
    try {
      let data = req.body;
      let title = data["title"]
      let ISBN = data["ISBN"]
      let CurrentDate = moment().format("DD MM YYYY hh:mm:ss");

      let userDetails = await userModel.findById(data["userId"]);

      if (!userDetails) {
        return res.status(400).send({ status: false, msg: " User does not Exist." });
      }

      let existBooks = await bookModel.findOne({title:title})
      if(existBooks){
        return res.status(409).send({status:false, msg:"title already in used Enter another title"})
      }
      if(existBooks["ISBN"]== ISBN ){
        return res.status(409).send({status:false,msg:"ISBN already in used"}) }

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


/////////////////////////////////////////////////////getBooks all /////////////////////////////////////////////////////////////////
const getAllBook = async function(req, res) {
    try {
        const queryParams = req.query
        if (queryParams.userId && !queryParams.userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({ status: false, message: "Incorrect userId" })
        }
        let findBooks = await bookModel.find({...queryParams, isDeleted: false }).select({ title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })

        findBooks.sort(function(a, b) {
            return a.title.localeCompare(b.title)
        })
        if (findBooks && findBooks.length == 0) {
            return res.status(404).send({ status: false, message: "Books not found" })
        }
        return res.status(200).send({ status: true, message: "Books list", data: findBooks })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
///////////////////////////////////////////////get books by path param//////////////////////////////////////////////////
const getBooksByPathParam = async function (req, res) {
    try {
        let bookIDEntered = req.params.bookId

        //===================== Checking the input value is Valid or Invalid =====================//
    //    if (!isValidRequestBody(bookIDEntered)) return res.status(400).send({ status: false, message: "Body is empty, please provied data" });
        if (!(bookIDEntered)) return res.status(400).send({ status: false, message: "Enter a book id" });

        let dat = await bookModel.findById(bookIDEntered)

        //===================== Checking Book Exsistance =====================//
        if (!dat) return res.status(404).send({ status: false, message: 'Book Not Found' })

        if (dat.isDeleted == true) return res.status(400).send({ status: false, message: `${dat.title} Book is deleted` })

        //===================== Getting Reviews of Book =====================//
        // let reviewsData = await reviewModel.find({ bookId: bookIDEntered })
        let reviewsData =[]
        let data = { dat, reviewsData: reviewsData }
        return res.status(200).send({ status: true, message: 'Books list', data: data })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

module.exports={createBooks,getAllBook,getBooksByPathParam};
