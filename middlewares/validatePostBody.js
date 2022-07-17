const {check, body} = require("express-validator")

const validateSplitPayMent = [
    check("ID").isNumeric(),
    check("Amount").isNumeric(),
    check("Currency").trim().notEmpty(),
    check("CustomerEmail").isEmail(), 
    check("SplitInfo").isArray().isLength({min: 1})
        .withMessage("Split Info cannot be empty")
        .isLength({max: 20})
        .withMessage("Split Info cannot have length greater than 20")
]

module.exports = validateSplitPayMent