const Controller = require("../controllers/user")
const upload = require("../helpers/multer")
const authentication = require("../middleware/authentication")

const userRouter = require("express").Router()
const file = upload()

userRouter.post("/register", Controller.register)
userRouter.post("/login", Controller.login)
userRouter.post("/verify/:id", Controller.verifyCode)
userRouter.get("/", authentication, Controller.getAllUsers)
userRouter.get("/:id", authentication, Controller.getUser)
userRouter.patch(
  "/:id",
  file.single("avatar"),
  authentication,
  Controller.updateUser,
)
userRouter.patch(
  "/status/:id",
  authentication,
  Controller.updateStatusActiveUser,
)
userRouter.delete("/:id", authentication, Controller.deleteUser)

module.exports = userRouter
