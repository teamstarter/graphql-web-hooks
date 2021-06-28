"use strict";
exports.__esModule = true;
function WebhookConfiguration(graphqlTypes, models) {
    return {
        model: models.eventType,
        actions: ['list', 'update', 'create', 'delete'],
        list: {
            before: function (findOptions, args, context) {
                return findOptions;
            }
        },
        create: {
            before: function (source, args, context) {
                return args.eventType;
            }
        }
    };
}
exports["default"] = WebhookConfiguration;
