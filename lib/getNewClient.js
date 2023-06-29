"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_fetch_1 = __importDefault(require("node-fetch"));
var core_1 = require("@apollo/client/core");
var cache_1 = require("@apollo/client/cache");
function getNewClient(uri, apolloClientOptions) {
    if (apolloClientOptions === void 0) { apolloClientOptions = {}; }
    var link = (0, core_1.createHttpLink)({
        uri: uri,
        fetch: node_fetch_1["default"]
    });
    var cache = new cache_1.InMemoryCache();
    var client = new core_1.ApolloClient(__assign({ link: link, cache: cache }, apolloClientOptions));
    return client;
}
exports["default"] = getNewClient;
