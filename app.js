require("dotenv").config()

const router = require("./routes")
const handleError = require("./middleware/handleError")

const cors = require("cors")
const express = require("express")
const http = require("http")
const socketIO = require("socket.io")

const app = express()
const port = process.env.PORT
const server = http.createServer(app)
const io = socketIO(server)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", router)
app.use("/upload", express.static("upload"))
app.use(handleError)

io.on("connection", (socket) => {
  console.log("Klien terhubung")
})

app.listen(port, () => {
  console.log(`REAL TIME CHAT SERVER CONNECTED!`)
})
