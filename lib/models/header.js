"use strict";
exports.__esModule = true;
function Header(sequelize) {
    var Header = sequelize.define('header', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        value: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        webhookId: {
            type: sequelize_1.DataTypes.INTEGER,
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
