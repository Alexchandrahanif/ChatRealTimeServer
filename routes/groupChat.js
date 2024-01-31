const Controller = require("../controllers/groupChat")
const authentication = require("../middleware/authentication")

const groupChatRouter = require("express").Router()

groupChatRouter.get("/personal/:GroupId", authentication, Controller.getAllChat)
groupChatRouter.get("/:id", authentication, Controller.getOneChat)
groupChatRouter.post("/", authentication, Controller.createChat)
groupChatRouter.patch("/:id", authentication, Controller.updateChat)
groupChatRouter.delete("/:id", authentication, Controller.deleteChat)

module.exports = groupChatRouter
