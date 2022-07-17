const chai = require("chai")
const expect = chai.expect

const chaiHttp = require("chai-http")

const {it} = require("mocha")

// Import app
const app = require("../index.js")

chai.use(chaiHttp)

const reqBody = {
    "ID": 13092,
    "Amount": 4500,
    "Currency": "NGN",
    "CustomerEmail": "anon8@customers.io",
    "SplitInfo": [
        {
            "SplitType": "FLAT",
            "SplitValue": 450,
            "SplitEntityId": "LNPYACC0019"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0011"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0015"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 2,
            "SplitEntityId": "LNPYACC0016"
        },
        {
            "SplitType": "FLAT",
            "SplitValue": 2450,
            "SplitEntityId": "LNPYACC0029"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 10,
            "SplitEntityId": "LNPYACC0215"
        }
    ]
}

const expectedResBody = {"ID":13092,
"Balance":0,
"SplitBreakdown":[
    {"SplitEntityId":"LNPYACC0019","Amount":450},
    {"SplitEntityId":"LNPYACC0029","Amount":2450},
    {"SplitEntityId":"LNPYACC0015","Amount":48},
    {"SplitEntityId":"LNPYACC0215","Amount":155.20000000000002},
    {"SplitEntityId":"LNPYACC0011","Amount":838.0799999999999},
    {"SplitEntityId":"LNPYACC0016","Amount":558.72}]
}

describe("POST Method for api /split-payments/compute", function(){
    it("Should Return status Response of 200 and not have error", function(done){
        chai.request(app)
            .post("/split-payments/compute")
            .set("Content-Type", "application/json")
            .send(reqBody)
            .end((err, res) => {

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done()
            })
    })
    it("should return a body response", function(done){
        chai.request(app)
        .post("/split-payments/compute")
        .set("Content-Type", "application/json")
        .send(reqBody)
        .end(function(err, res){
                expect(res.text).to.deep.equal(JSON.stringify(expectedResBody))
                done()
        })
    })
})