"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.callWebhook = exports.getModel = exports.getApolloServer = void 0;
var getApolloServer_1 = __importDefault(require("./graphql/getApolloServer"));
exports.getApolloServer = getApolloServer_1["default"];
var models_1 = __importDefault(require("./models"));
exports.getModel = models_1["default"];
var callWebhook_1 = __importDefault(require("./callWebhook"));
exports.callWebhook = callWebhook_1["default"];
