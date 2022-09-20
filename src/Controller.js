const UserModel = require("../models/userModel")
const validator = require('../validator/validator')


const createUser = async function(req, res) {
    try {
        const userData = req.body
        const { title, name, phone, email, password, address } = userData
        if (!isValidRequestBody(userData)) {
            return res.status(400).send({ status: false, message: "Body is empty, please provied data" });
        }

        if (!title) {
            return res.status(400).send({ status: false, message: "title is required" })
        };
        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, message: "Title is in wrong format" })
        };


        if (title !== "Mr" && title !== "Mrs" && title !== "Miss") return res.status(400).send({ status: false, data: "title should be Mr or Mrs or Miss" })

        if (!name) {
            return res.status(400).send({ status: false, message: "name is required" })
        };
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, message: "Name is in wrong format" })
        };
        if (!name.match(nameRegex)) {
            return res.status(400).send({ status: false, message: "Please Provide correct input for name" })
        };

        if (!phone) {
            return res.status(400).send({ status: false, message: "phone is required" })
        };
        if (!validator.isValid(phone)) {
            return res.status(400).send({ status: false, message: "Phone is in wrong format" })
        };
        if (!mobileRegex.test(phone)) {
            return res.status(400).send({ status: false, message: "Please Provide valid Mobile No" })
        };
        let duplicateMobile = await userModel.findOne({ phone: phone });
        if (duplicateMobile) {
            return res.status(400).send({ status: false, message: "Mobile No. already exists!" });
        };

        if (!email) {
            return res.status(400).send({ status: false, message: "email is required" })
        };
        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: "Email id is in wrong format" })
        };
        if (!emailRegex.test(email)) {
            return res.status(400).send({ status: false, message: "Please Enter Email in valid Format" })
        };
        let duplicateEmail = await userModel.findOne({ email: email });
        if (duplicateEmail) {
            return res.status(400).send({ status: false, message: "Email already exists!" });
        };

        if (!password) {
            return res.status(400).send({ status: false, message: "password is required" })
        };
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is in wrong format" })
        };
        if (!validator.isValidPassword(password)) {
            return res.status(400).send({ status: false, message: "Password should be between 8 and 15 characters." })
        };

        const newUser = await UserModel.create(data)
        return res.status(201).send({ status: true, data: newUser })

    } catch (error) {
        return res.status(500).send({ data: error.message })
    }
}
module.exports.createUser = createUser