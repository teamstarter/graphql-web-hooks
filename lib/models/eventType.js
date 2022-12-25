"use strict";
exports.__esModule = true;
function EventType(sequelize) {
    var EventType = sequelize.define('eventType', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        webhookId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'eventType',
        paranoid: true
    });
    return EventType;
}
exports["default"] = EventType;
