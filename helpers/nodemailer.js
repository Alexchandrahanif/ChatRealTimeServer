const nodemailer = require("nodemailer")
require("dotenv").config()

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.AUTH,
  },
})

// function kirimEmail ({penerima, })

function emailSend(dataUser, message, link) {
  if (link) {
    return new Promise((resolve, reject) => {
      let mailOptions = {
        from: process.env.EMAIL,
        to: dataUser.email,
        subject: `Welcome to Printhink.id - ${dataUser.name}`,
        html: `<div style="font-family: Helvetica;"><h3>Link Reset password  ${link} </h3><br>Thank you</div>`,
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log("Error!", err)
        } else {
          console.log(`Email sent: ${dataUser.email}`)
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      let mailOptions = {
        from: process.env.EMAIL,
        to: dataUser.email,
        subject: `Welcome to Printhink.id - ${dataUser.name}`,
        html: `<div style="font-family: Helvetica;"><h3>${message}</h3><br>Terimakasih</div>`,
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log("Error!", err)
        } else {
          console.log(`Email sent: ${dataUser.email}`)
        }
      })
    })
  }
}

module.exports = emailSend
