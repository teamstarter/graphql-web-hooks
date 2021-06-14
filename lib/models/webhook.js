"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function Webhook(sequelize) {
    var Webhook = sequelize.define('webhook', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        eventType: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: true,
            defaultValue: null
        },
        securityMetadata: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'webhook',
        paranoid: true
    });
    return Webhook;
}
exports["default"] = Webhook;
