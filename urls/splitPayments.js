const express = require("express")
const splitPayments = express.Router()


// Middleware for Request.Body Validation
const validateSplitPayMent = require("../middlewares/validatePostBody")
// Controller
const computeSplitPayment = require("../controllers/splitPayments")

splitPayments.route("/compute")
    .post(validateSplitPayMent, computeSplitPayment)


module.exports = splitPayments

