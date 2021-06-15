"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var acquire_1 = __importDefault(require("./webhook/acquire"));
function WebhookConfiguration(graphqlTypes, models, isEventAllowed) {
    return {
        model: models.webhook,
        actions: ['update', 'create', 'delete'],
        additionalMutations: {
            acquireWebhook: acquire_1["default"](graphqlTypes, models, isEventAllowed)
        },
        list: {
            before: function (findOptions) {
                return findOptions;
            }
        }
    };
}
exports["default"] = WebhookConfiguration;
