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
  } else if (err.name === "Password dan Konfirmasi Password Tidak Sama") {
    code = 400
    message = "Password dan Konfirmasi Password Tidak Sama"
  } else if (err.name === "Maaf, Kode Anda Sudah Kadaluarsa") {
    code = 400
    message = `Maaf, Kode Anda Sudah Kadaluarsa ${
      err.menit > 60 ? "1 Jam lebih yang lalu" : err.menit + "Menit lalu"
    }`
  } else if (err.name === "Maaf, Kode Tidak Cocok") {
    code = 400
    message = `Maaf, Kode Tidak Cocok, tersisa ${err.kesempatan} lagi`
  } else if (err.name === "Maaf, Kesempatan Anda Habis") {
    code = 400
    message = `Maaf, Kesempatan Anda Habis`
  } else if (err.name === "Akun Anda Sudah Aktif") {
    code = 400
    message = `Akun Anda Sudah Aktif`
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
    code = 404
    message = "Id User Tidak Ditemukan"
  } else if (err.name === "Id Chat Tidak Ditemukan") {
    code = 404
    message = "Id Chat Tidak Ditemukan"
  } else if (err.name === "Id Group Tidak Ditemukan") {
    code = 404
    message = "Id Group Tidak Ditemukan"
  } else if (err.name === "Id Group Chat Tidak Ditemukan") {
    code = 404
    message = "Id Group Chat Tidak Ditemukan"
  } else if (err.name === "Id Contact Tidak Ditemukan") {
    code = 404
    message = "Id Contact Tidak Ditemukan"
  }

  res.status(code).json({
    statusCode: code,
    message: message,
  })
}

module.exports = handleError
