const Controller = require("../controllers/user")

const userRouter = require("express").Router()

userRouter.post("/register", Controller.register)
userRouter.post("/login", Controller.login)
userRouter.get("/", Controller.getAllUsers)
userRouter.get("/:id", Controller.getUser)
userRouter.put("/:id", Controller.updateUser)
userRouter.patch("/status/:id", Controller.updateStatusActiveUser)
userRouter.delete("/:id", Controller.deleteUser)

module.exports = userRouter
