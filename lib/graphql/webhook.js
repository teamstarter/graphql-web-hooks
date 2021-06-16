"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
function WebhookConfiguration(graphqlTypes, models, getMetadataFromContext) {
    return {
        model: models.webhook,
        actions: ['list', 'update', 'create', 'delete'],
        list: {
            before: function (findOptions, args, context) {
                var _a;
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
                return findOptions;
            }
        }
    };
}
exports["default"] = WebhookConfiguration;
