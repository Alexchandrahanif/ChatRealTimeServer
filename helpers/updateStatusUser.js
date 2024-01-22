const { User } = require("../models")

const updateStatusActiveUser = async (id, status) => {
  const data = await User.findOne({
    where: {
      id,
    },
  })

  if (!data) {
    throw { name: "Id User Tidak Ditemukan" }
  }

  await User.update(
    {
      statusActive: status,
    },
    {
      where: {
        id,
      },
    },
  )
}

module.exports = updateStatusActiveUser
