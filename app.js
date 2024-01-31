require("dotenv").config()

const router = require("./routes")
const handleError = require("./middleware/handleError")
const upload = require("./helpers/multer")

const cors = require("cors")
const express = require("express")
const http = require("http")
const socketIO = require("socket.io")
const file = upload()

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}

app.use(cors())
io.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", router)
app.use("/upload", express.static("upload"))
app.use(handleError)

io.on("connection", (socket) => {
  console.log("A user connected")
  const { userId } = socket.handshake.query

  updateUserStatus(userId, true)

  socket.on("typing", () => {
    socket.broadcast.emit("userTyping", { userId, isTyping: true })
  })

  file.on("progress", (file, buffer, { total }) => {
    const percentage = (buffer.length / total) * 100
    socket.emit("progress", percentage)
  })

  socket.on("stopTyping", () => {
    socket.broadcast.emit("userTyping", { userId, isTyping: false })
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

server.listen(port, () => {
  console.log(`REAL TIME CHAT SERVER CONNECTED!`)
})
