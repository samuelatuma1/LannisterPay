# This Project was built Using
    - node.js, express.js
### Dependencies
    - express-validator
### Dev Dependencies
    - "chai": "^4.3.6,
    - chai-http: ^4.3.0,
    - mocha: ^10.0.0,
    - nodemon: ^2.0.19

### End Point

     - @method POST /split-payments/compute
     - @desc accepts a transaction object with properties specified in ReqBody, and return with the 200 0K HTTP code and a single object as described in Response Body
     - @param {Request< 
     -         ReqParams = {}, 
     -         ResBody = {},
     -         ReqBody = {
     -              ID: Number, Amount: Number,
     -              Currency: String, CustomerEmail: String(Email),
     -              SplitInfo: {SplitType: String, SplitValue: Number, SplitEntityId: String}[]
     - },
     -         ReqQuery = {},
     -         Locals = {}
     -  >} req 
     - @
     - @returns 404 with Response Body {err: String}
     - OR 200 with Response Body {
                        "ID": Number,
                        "Balance": Number,
                        "SplitBreakdown": {"SplitEntityId":String,"Amount":Number}[]
                            
    
     }