import { DataTypes } from 'sequelize'

export default function Webhook(sequelize: any) {
  var Webhook = sequelize.define(
    'webhook',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      securityMetadata: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'webhook',
      paranoid: true,
    }
  )

  Webhook.associate = function (models: any) {
    models.webhook.hasMany(models.header, {
      as: 'headers',
      foreignKey: 'webhookId',
      sourceKey: 'id',
    })

    models.webhook.hasMany(models.eventType, {
      as: 'eventTypes',
      foreignKey: 'webhookId',
      sourceKey: 'id',
    })
  }

  return Webhook
}
