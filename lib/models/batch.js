"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function Batch(sequelize) {
    var Batch = sequelize.define('batch', {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: sequelize_1.DataTypes.STRING
        },
        pipelineId: {
            type: sequelize_1.DataTypes.INTEGER
        }
    }, {
        freezeTableName: true,
        tableName: 'batch',
        paranoid: true
    });
    return Batch;
}
exports["default"] = Batch;
