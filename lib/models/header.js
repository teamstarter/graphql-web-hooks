"use strict";
exports.__esModule = true;
function Header(sequelize, DataTypes) {
    var Header = sequelize.define('header', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        webhookId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'header',
        paranoid: true
    });
    return Header;
}
exports["default"] = Header;
