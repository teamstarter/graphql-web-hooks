"use strict";
exports.__esModule = true;
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
        securityMetadata: {
            type: sequelize_1.DataTypes.JSON,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'webhook',
        paranoid: true
    });
    Webhook.associate = function (models) {
        models.webhook.hasMany(models.header, {
            as: 'headers',
            foreignKey: 'webhookId',
            sourceKey: 'id'
        });
        models.webhook.hasMany(models.eventType, {
            as: 'eventTypes',
            foreignKey: 'webhookId',
            sourceKey: 'id'
        });
    };
    return Webhook;
}
exports["default"] = Webhook;
