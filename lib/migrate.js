"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var umzug_1 = __importDefault(require("umzug"));
/**
 * This file handles an im-memory SQLite database used for test purposes.
 * It exports three functions:
 * - migrateDatabase: generates the database from the migrations files
 * - seedDatabase: seeds the database from the seeders files
 * - deleteTables: delete all the tables
 * It also exports sequelize models.
 * - models
 */
/**
 * Seeds the database with mockup data
 */
exports["default"] = (function (models) { return __awaiter(void 0, void 0, void 0, function () {
    var sequelize, umzugOptions, functionFiles, functions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sequelize = models.sequelize // sequelize is the instance of the db
                ;
                umzugOptions = function (path) { return ({
                    storage: 'sequelize',
                    storageOptions: {
                        sequelize: sequelize,
                        tableName: 'gnj_sequelize_meta'
                    },
                    migrations: {
                        params: [
                            sequelize.getQueryInterface(),
                            sequelize.constructor,
                            function () {
                                throw new Error('technical|Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
                            },
                        ],
                        path: path,
                        pattern: /\.js$/
                    }
                }); };
                functionFiles = fs_1["default"]
                    .readdirSync(path_1["default"].join(__dirname, '/../migrations'))
                    .sort()
                    .map(function (f) { return path_1["default"].basename(f, '.js'); });
                functions = new umzug_1["default"](umzugOptions(path_1["default"].join(__dirname, '/../migrations')));
                return [4 /*yield*/, functions.up({
                        migrations: functionFiles
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });