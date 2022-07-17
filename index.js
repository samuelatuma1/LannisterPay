const express = require("express")
const app = express()
// URLS
const splitPayments = require("./urls/splitPayments")
// Allowing Body
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/split-payments", splitPayments)



const PORT = process.env.PORT || 8080
// app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))

module.exports = app



