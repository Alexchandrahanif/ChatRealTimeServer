const handleError = (err, req, res, next) => {
  console.log(err)
  let code = 500
  let message = "Internal Server Error"

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400
    message = []
    err.errors.forEach((el) => {
      message.push(el.message)
    })
  }

  // 400
  else if (err.name === "Mohon Masukkan Password") {
    code = 400
    message = "Mohon Masukkan Password"
  } else if (err.name === "Mohon Masukkan Email") {
    code = 400
    message = "Mohon Masukkan Email"
  }

  // 401
  else if (err.name === "JsonWebTokenError") {
    code = 401
    message = "Token Tidak Sesuai"
  } else if (err.name === "Email/Password Salah") {
    code = 401
    message = "Email/Password Salah"
  } else if (err.name === "Invalid authorization") {
    code = 401
    message = "Akses Token Tidak Ada"
  }

  // 403
  else if (err.name === "Forbidden") {
    code = 403
    message = "Anda Tidak Memiliki Hak Akses"
  } else if (err.name === "API_KEY Invalid") {
    code = 403
    message = "API_KEY Invalid"
  }

  // 404
  else if (err.name === "Id User Tidak Ditemukan") {
    code = 403
    message = "Id User Tidak Ditemukan"
  }

  res.status(code).json({
    statusCode: code,
    message: message,
  })
}

module.exports = handleError
