let express = require("express")

let app = express()

app.get("/api", (req, res) => {
    res.json({"users" : ["userone", "usertwo", "userthree"] })
})

app.listen(5000, () => {
    console.log("server started at port 5000")
})