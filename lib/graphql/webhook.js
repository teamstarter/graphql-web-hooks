"use strict";
exports.__esModule = true;
function WebhookConfiguration(graphqlTypes, models) {
    return {
        model: models.webhook,
        actions: ['list', 'update', 'create', 'delete'],
        list: {
            before: function (findOptions) {
                return findOptions;
            }
        }
    };
}
exports["default"] = WebhookConfiguration;
