require("dotenv").config()

const router = require("./routes")
const handleError = require("./middleware/handleError")
const upload = require("./helpers/multer")

const cors = require("cors")
const express = require("express")

const http = require("http")
const socketIO = require("socket.io")
const updateStatusActiveUser = require("./helpers/updateStatusUser")
const { verifyAccessToken } = require("./helpers/helper")
const file = upload()

const app = express()
const server = http.createServer(app)
const io = socketIO(server, { cors: { origin: "*" } })

const port = process.env.PORT

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", router)
app.use("/upload", express.static("upload"))
app.use(handleError)

const onlineUsers = {}

io.on("connection", (socket) => {
  console.log("A user connected")

  const { token } = socket.handshake.query

  let userId = null

  if (token !== "null") {
    const data = verifyAccessToken(token)

    userId = data.id
    onlineUsers[userId] = true

    io.emit("updateOnlineStatus", { userId: userId, status: true })
    console.log(onlineUsers)
  }

  socket.on("typing", () => {
    io.emit("userTyping", { userId, isTyping: true })
  })

  socket.on("stopTyping", () => {
    io.emit("userTyping", { userId, isTyping: false })
  })

  socket.on("disconnect", () => {
    if (token !== "null") {
      const data = verifyAccessToken(token)
      onlineUsers[data.id] = false

      io.emit("updateOnlineStatus", { userId: data.id, status: false })
    }
    console.log(onlineUsers)
    console.log("User disconnected")
  })
})

server.listen(port, () => {
  console.log(`REAL TIME CHAT SERVER CONNECTED!`)
})
