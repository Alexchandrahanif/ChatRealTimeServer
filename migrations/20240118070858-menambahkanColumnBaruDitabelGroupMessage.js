"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("GroupMessages", "readMessageStatus", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })
    await queryInterface.addColumn("GroupMessages", "isUpdate", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("GroupMessages", "readMessageStatus")
    await queryInterface.removeColumn("GroupMessages", "isUpdate")
  },
}
