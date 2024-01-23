const contactRouter = require("./contact")
const groupRouter = require("./group")
const groupChatRouter = require("./groupChat")
const personalCharRouter = require("./personalChat")
const userRouter = require("./user")

const router = require("express").Router()

router.use("/user", userRouter)
router.use("/contact", contactRouter)
router.use("/chat", personalCharRouter)
router.use("/groupChat", groupChatRouter)
router.use("/group", groupRouter)

module.exports = router
