"use strict";
exports.__esModule = true;
function HeaderConfiguration(graphqlTypes, models) {
    return {
        model: models.header,
        actions: ['create', 'update', 'delete', 'count'],
        subscriptions: ['update', 'delete']
    };
}
exports["default"] = HeaderConfiguration;
