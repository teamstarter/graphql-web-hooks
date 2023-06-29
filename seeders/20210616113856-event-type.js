const timestamp = (entry) =>
  Object.assign(entry, {
    createdAt: entry.createdAt || new Date('2007-07-12 00:04:22'),
    updatedAt: new Date('2007-07-12 00:04:22'),
    deletedAt: entry.deletedAt || null, // If we want a seeders to have a deletedAt value, do not override it
  })

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert(
      'eventType',
      [
        {
          id: 1,
          type: 'publish',
          webhookId: 1,
        },
        {
          id: 2,
          type: 'delete',
          webhookId: 1,
        },
        {
          id: 3,
          type: 'delete',
          webhookId: 2,
        },
        {
          id: 4,
          type: 'cancel',
          webhookId: 3,
        },
        {
          id: 5,
          type: 'publish',
          webhookId: 3,
        },
      ].map(timestamp),
      {}
    )
  },

  down: function (queryInterface) {
    return queryInterface.bulkDelete('eventType', null, {})
  },
}
