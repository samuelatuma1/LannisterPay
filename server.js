const app = require("./index.js")

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))