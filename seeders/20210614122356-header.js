const timestamp = (entry) =>
  Object.assign(entry, {
    createdAt: entry.createdAt || new Date('2007-07-12 00:04:22'),
    updatedAt: new Date('2007-07-12 00:04:22'),
    deletedAt: entry.deletedAt || null, // If we want a seeders to have a deletedAt value, do not override it
  })

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert(
      'header',
      [
        {
          id: 1,
          key: 'header-key-1',
          value: 'header-value-1',
          webhookId: 1
        },
        {
          id: 2,
          key: 'header-key-2',
          value: 'header-value-2',
          webhookId: 1
        },
      ].map(timestamp),
      {}
    )
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('header', null, {})
  },
}
