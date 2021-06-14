module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn('header', 'webhookId', {
      type: Sequelize.INTEGER,
    })
  },

  down: async function (queryInterface) {
    await queryInterface.removeColumn('header', 'webhookId')
  },
}
