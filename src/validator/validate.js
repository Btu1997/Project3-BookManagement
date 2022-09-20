//===================== Checking the input value is Valid or Invalid =====================//
const valid = function(value) {
    if (typeof value == "number" || typeof value == "undefined" || typeof value == null) { return false }
    if (typeof value == "string" && value.trim().length == 0) { return false }
    return true
}



const moment = require('moment')

const isValid = function(value) {
    if (typeof value !== "string") return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
};

const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0;
};

const isValidPassword = function(password) {
    password = password.trim()
    if (password.length < 8 || password.length > 15) {
        return false
    }
    return true
}
module.exports = { isValid, isValidRequestBody, isValidPassword, }

//===================== Checking the input value with Regex =====================//
const regForName = function(value) { return (/^[A-Za-z]+$\b/).test(value) }

const regForTitle = function(value) { return (/^(Mr|Mrs|Miss)+$\b/).test(title) }

const regForEmail = function(value) { return (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(value) }

const regForMobileNo = function(value) { return (/^((\+91)?|91)?[789][0-9]{9}$/g).test(value) }



//=====================Module Export=====================//
module.exports = { valid, regForName, regForFullName, regForEmail, regForMobileNo }