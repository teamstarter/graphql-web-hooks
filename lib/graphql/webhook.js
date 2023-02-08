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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function WebhookConfiguration(graphqlTypes, models, getMetadataFromContext, hook) {
    var _this = this;
    return {
        model: models.webhook,
        actions: ['list', 'update', 'create', 'delete', 'count'],
        subscriptions: ['create', 'update', 'delete'],
        list: {
            before: function (findOptions, args, context) {
                var _a;
                var _b;
                if (findOptions.where) {
                    findOptions.where = (_a = {},
                        _a[sequelize_1.Op.and] = [
                            findOptions.where,
                            { securityMetadata: getMetadataFromContext(context) },
                        ],
                        _a);
                }
                else {
                    findOptions.where = {
                        securityMetadata: getMetadataFromContext(context)
                    };
                }
                if ((_b = hook === null || hook === void 0 ? void 0 : hook.list) === null || _b === void 0 ? void 0 : _b.before) {
                    hook.list.before(findOptions, args, context);
                }
                return findOptions;
            },
            after: function (result, args, context, info) {
                var _a;
                if ((_a = hook === null || hook === void 0 ? void 0 : hook.list) === null || _a === void 0 ? void 0 : _a.after) {
                    hook.list.after(result, args, context, info);
                }
                return result;
            }
        },
        create: {
            before: function (source, args, context) {
                var _a;
                if ((_a = hook === null || hook === void 0 ? void 0 : hook.create) === null || _a === void 0 ? void 0 : _a.before) {
                    hook.create.before(source, args, context);
                }
                args.webhook.securityMetadata = getMetadataFromContext(context);
                return args.webhook;
            },
            after: function (webhook, source, args, context) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    if ((_a = hook === null || hook === void 0 ? void 0 : hook.create) === null || _a === void 0 ? void 0 : _a.after) {
                        (_b = hook.create) === null || _b === void 0 ? void 0 : _b.after(webhook, source, args, context);
                    }
                    return [2 /*return*/, webhook];
                });
            }); }
        },
        update: {
            before: function (source, args, context) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    if ((_a = hook === null || hook === void 0 ? void 0 : hook.update) === null || _a === void 0 ? void 0 : _a.before) {
                        hook.update.before(source, args, context);
                    }
                    return [2 /*return*/, args.webhook];
                });
            }); },
            after: function (webhook, oldWebhook, source, args, context) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    if ((_a = hook === null || hook === void 0 ? void 0 : hook.update) === null || _a === void 0 ? void 0 : _a.after) {
                        hook.update.after(webhook, oldWebhook, source, args, context);
                    }
                    return [2 /*return*/, webhook];
                });
            }); }
        },
        "delete": {
            before: function (where, source, args, context) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    if ((_a = hook === null || hook === void 0 ? void 0 : hook["delete"]) === null || _a === void 0 ? void 0 : _a.before) {
                        hook["delete"].before(where, source, args, context);
                    }
                    return [2 /*return*/, where];
                });
            }); },
            after: function (deletedWebhook, source, args, context) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if ((_a = hook === null || hook === void 0 ? void 0 : hook["delete"]) === null || _a === void 0 ? void 0 : _a.after) {
                                hook["delete"].after(deletedWebhook, source, args, context);
                            }
                            return [4 /*yield*/, models.header.destroy({
                                    where: { webhookId: deletedWebhook.id }
                                })];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, models.eventType.destroy({
                                    where: { webhookId: deletedWebhook.id }
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); }
        }
    };
}
exports["default"] = WebhookConfiguration;
