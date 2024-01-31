const Controller = require("../controllers/contact")
const authentication = require("../middleware/authentication")

const contactRouter = require("express").Router()

contactRouter.get("/personal", authentication, Controller.getAllPersonal)
contactRouter.get("/", authentication, Controller.getAll)
contactRouter.get("/:id", authentication, Controller.getOne)
contactRouter.post("/", authentication, Controller.create)
contactRouter.patch("/:id", authentication, Controller.update)
contactRouter.delete("/:id", authentication, Controller.delete)

module.exports = contactRouter
