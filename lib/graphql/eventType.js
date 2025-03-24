"use strict";
exports.__esModule = true;
function WebhookConfiguration(graphqlTypes, models) {
    return {
        model: models.eventType,
        actions: ['list', 'update', 'create', 'delete'],
        list: {
            before: function (_a) {
                var findOptions = _a.findOptions;
                return findOptions;
            }
        },
        create: {
            before: function (_a) {
                var args = _a.args;
                return args.eventType;
            }
        }
    };
}
exports["default"] = WebhookConfiguration;
