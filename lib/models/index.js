"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var sequelize_1 = require("sequelize");
var db = null;
/**
 * In a standard project the configuration is a commited file. But here
 * you can specify it if needed. So we have to expose a getter that caches
 * the models.
 *
 * It must be noted that NJ does not support changing the models configuration
 * once the models are fetched.
 */
function initDb(_a) {
    var dbConfig = _a.dbConfig, sequelizeInstance = _a.sequelizeInstance;
    var basename = path_1["default"].basename(module.filename);
    db = {};
    if (dbConfig &&
        typeof dbConfig.use_env_variable !== 'undefined' &&
        dbConfig.use_env_variable &&
        !sequelizeInstance) {
        sequelizeInstance = new sequelize_1.Sequelize();
    }
    else if (!sequelizeInstance) {
        var connexion = process.env.NODE_ENV &&
            typeof dbConfig[process.env.NODE_ENV] !== 'undefined'
            ? dbConfig[process.env.NODE_ENV]
            : dbConfig;
        sequelizeInstance = new sequelize_1.Sequelize(connexion);
    }
    fs_1["default"].readdirSync(__dirname)
        .filter(function (file) {
        return (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js');
    })
        .forEach(function (file) {
        var model = require(path_1["default"].join(__dirname, file))["default"](sequelizeInstance, sequelize_1.DataTypes);
        db[model.name] = model;
    });
    Object.keys(db).forEach(function (modelName) {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });
    db.sequelize = sequelizeInstance;
    db.Sequelize = sequelize_1.Sequelize;
}
function getModels(_a) {
    var dbConfig = _a.dbConfig, sequelizeConnection = _a.sequelizeConnection;
    if (!db) {
        initDb({ dbConfig: dbConfig, sequelizeConnection: sequelizeConnection });
    }
    return db;
}
exports["default"] = getModels;
