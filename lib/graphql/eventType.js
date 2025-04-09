"use strict";
exports.__esModule = true;
function WebhookConfiguration(graphqlTypes, models) {
    return {
        model: models.eventType,
        actions: ['list', 'update', 'create', 'delete'],
        list: {
            beforeList: function (_a) {
                var findOptions = _a.findOptions;
                return findOptions;
            }
        },
        create: {
            beforeCreate: function (_a) {
                var args = _a.args;
                return args.eventType;
            }
        }
    };
}
exports["default"] = WebhookConfiguration;
