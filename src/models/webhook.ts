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
      eventTypesWhitelist: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
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
  return Webhook
}
