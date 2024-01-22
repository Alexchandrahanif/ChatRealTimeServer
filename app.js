require("dotenv").config()

const router = require("./routes")
const handleError = require("./middleware/handleError")

const cors = require("cors")
const express = require("express")
const http = require("http") // Tambahkan modul http
const socketIO = require("socket.io") // Tambahkan modul socket.io

const app = express()
const server = http.createServer(app) // Tambahkan modul socket.io
const io = socketIO(server) // Inisialisasi Socket.IO

const port = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", router)
app.use("/upload", express.static("upload"))
app.use(handleError)

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("A user connected")

  // Tambahkan event atau logika Socket.IO di sini sesuai kebutuhan Anda

  // Mendapatkan data pengguna dari client
  const { userId } = socket.handshake.query

  // Set status user menjadi online (true) di database
  updateUserStatus(userId, true)

  // Event untuk menangani pesan ketika pengguna mengetik
  socket.on("typing", () => {
    // Implementasi logika ketika pengguna mengetik
    // Misalnya, kirim pesan bahwa pengguna sedang mengetik kepada pengguna lain
    socket.broadcast.emit("userTyping", { userId, isTyping: true })
  })

  // Event untuk menangani pesan ketika pengguna berhenti mengetik
  socket.on("stopTyping", () => {
    // Implementasi logika ketika pengguna berhenti mengetik
    // Misalnya, kirim pesan bahwa pengguna telah berhenti mengetik kepada pengguna lain
    socket.broadcast.emit("userTyping", { userId, isTyping: false })
  })
  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})

server.listen(port, () => {
  console.log(`REAL TIME CHAT SERVER CONNECTED!`)
})
