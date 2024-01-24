const Controller = require("../controllers/groupChat")
const authentication = require("../middleware/authentication")

const groupChatRouter = require("express").Router()

groupChatRouter.get("/personal/:GroupId", authentication, Controller.getAllChat)
groupChatRouter.get("/:id", authentication, Controller.getOneChat)
groupChatRouter.post(
  "/personal/:GroupId",
  authentication,
  Controller.getAllChat,
)
groupChatRouter.patch(
  "/personal/:GroupId",
  authentication,
  Controller.getAllChat,
)
groupChatRouter.delete(
  "/personal/:GroupId",
  authentication,
  Controller.getAllChat,
)
module.exports = groupChatRouter
