const express = require("express")
const bodyParser = require("body-parser") 
const cors = require("cors") 
const vehicleRoutes = require("./routes/routes")

const app = express()
const host = 'http://localhost'
const port = 8000

app.use(bodyParser.json())
// const corsOptions ={
//     origin:'*', 
//     credentials:true,         
//     optionSuccessStatus:200,
// }
// app.use(cors(corsOptions))

app.use("/", vehicleRoutes)

app.get("/", (req, res) => res.send("Hello from express"))
app.all("*", (req, res) => res.send("That route does not exist"))

app.listen(port, () => console.log(`Server is running on port: ${host}:${port}`))