export default function EventType(sequelize: any, DataTypes: any) {
  var EventType = sequelize.define(
    'eventType',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      webhookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: 'eventType',
      paranoid: true,
    }
  )
  return EventType
}
