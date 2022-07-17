const {validationResult} = require("express-validator")
const SplitEntity = require("../utils.js")
/**
 * @method POST /split-payments/compute
 * @desc accepts a transaction object with properties specifie
 * @param {Request< 
 *         ReqParams = {}, 
 *         ResBody = {},
 *         ReqBody = {
 *              ID: Number, Amount: Number,
 *              Currency: String, CustomerEmail: String(Email),
 *              SplitInfo: {SplitType: String, SplitValue: Number, SplitEntityId: String}[]
 * },
 *         ReqQuery = {},
 *         Locals = {}
 *  >} req 
 * @param {*} res 
 * @returns 
 */
function computeSplitPayment(req, res){
    const formErrors = validationResult(req).errors
    if(formErrors.length > 0){
        return res.status(400).json(formErrors)
    }
    const formData = req.body
    const computedSplitPayment = SplitEntity(formData)
    return computedSplitPayment.err ?
                 res.status(400).json(computedSplitPayment) : 
                res.status(200).json(computedSplitPayment)
}

module.exports = computeSplitPayment