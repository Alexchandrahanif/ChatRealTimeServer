const Controller = require("../controllers/personalChat")
const upload = require("../helpers/multer")
const authentication = require("../middleware/authentication")

const personalCharRouter = require("express").Router()
const file = upload()

personalCharRouter.get(
  "/personal/:ReceiverId",
  authentication,
  Controller.getAllChat,
)
personalCharRouter.get("/:id", authentication, Controller.getOneChat)
personalCharRouter.post(
  "/",
  authentication,
  file.single("messageImage"),
  Controller.createChat,
)
personalCharRouter.patch("/:id", authentication, Controller.updateChat)
personalCharRouter.patch(
  "/status/:SenderId",
  authentication,
  Controller.updateStatusChat,
)
personalCharRouter.delete("/:id", authentication, Controller.deleteChat)

module.exports = personalCharRouter
