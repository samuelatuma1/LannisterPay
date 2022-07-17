const {it, describe} = require("mocha")
const expect = require("chai").expect
const SplitEntity = require("../utils.js")

// Testing Utils
describe("SplitEntity", function(){
    
    const case1 = {
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
            },
        ]
    }
    const case1Res = {"ID":13092,
                        "Balance":0,
                        "SplitBreakdown":[
                            {"SplitEntityId":"LNPYACC0019","Amount":450},
                            {"SplitEntityId":"LNPYACC0029","Amount":2450},
                            {"SplitEntityId":"LNPYACC0015","Amount":48},
                            {"SplitEntityId":"LNPYACC0215","Amount":155.20000000000002},
                            {"SplitEntityId":"LNPYACC0011","Amount":838.0799999999999},
                            {"SplitEntityId":"LNPYACC0016","Amount":558.72}]
    }
    const SplitEntityRes = SplitEntity(case1)
    it("SplitEntity should be an object", function(done){
        expect(SplitEntityRes).to.be.an("object")
        done()
    })
    it("SplitEntity should return an Object having property Balance", function(done){
        expect(SplitEntityRes).to.have.property( "Balance")
        done()
    })
    it(`calling SplitEntity on ${case1} should match ${(case1)}`, function(done){
        expect(SplitEntityRes).to.deep.equal(case1Res)
        done()
    })
})

describe("SplitEntity Constraints", function(){
    
    const edgeCase1 = {
        "ID": 13092,
        "Amount": 4500,
        "Currency": "NGN",
        "CustomerEmail": "anon8@customers.io",
        "SplitInfo": [
            {
                "SplitType": "FLAT",
                "SplitValue": 4500,
                "SplitEntityId": "LNPYACC0019"
            },
            {
                "SplitType": "FLAT",
                "SplitValue": 30,
                "SplitEntityId": "LNPYACC0011"
            }
        ]
    }
    const edgeCase2 = {
        "ID": 13092,
        "Amount": 4500,
        "Currency": "NGN",
        "CustomerEmail": "anon8@customers.io",
        "SplitInfo": []
    }
    it("Should return {error: 'Balance cannot be negative'}", function(done){
        const SplitEntityRes = SplitEntity(edgeCase1)
        
        expect(SplitEntityRes).to.deep.equal({
            err: "Balance cannot be negative"
        })
        done()
    })
    it("should return {error: 'array can contain a minimum of 1 split entity and a maximum of 20 entities' }", function(done){
        const SplitEntityRes = SplitEntity(edgeCase2)

        expect(SplitEntityRes).to.deep.equal({error: 'array can contain a minimum of 1 split entity and a maximum of 20 entities' })
        done()
    })
})