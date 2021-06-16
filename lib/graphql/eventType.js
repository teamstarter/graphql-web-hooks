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
                return __assign(__assign({}, args), { type: 'all' });
            }
        }
    };
}
exports["default"] = WebhookConfiguration;
