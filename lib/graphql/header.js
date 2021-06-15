"use strict";
exports.__esModule = true;
function HeaderConfiguration(graphqlTypes, models) {
    return {
        model: models.header,
        actions: ['create', 'delete']
    };
}
exports["default"] = HeaderConfiguration;
