const Controller = require("../controllers/personalChat")
const upload = require("../helpers/multer")
const authentication = require("../middleware/authentication")

const personalCharRouter = require("express").Router()
const file = upload()

personalCharRouter.get(
  "/personal/:ReveiverId",
  authentication,
  Controller.getAllChat,
)
personalCharRouter.get("/:id", authentication, Controller.getOneChat)
personalCharRouter.post(
  "/",
  authentication,
  file.single("messageImage"),
  Controller.getOneChat,
)
personalCharRouter.patch("/:id", authentication, Controller.createChat)
personalCharRouter.patch("/status/:id", authentication, Controller.updateChat)
personalCharRouter.delete("/:id", authentication, Controller.deleteChat)

module.exports = personalCharRouter
