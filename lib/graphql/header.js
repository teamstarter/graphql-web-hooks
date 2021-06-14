"use strict";
exports.__esModule = true;
function HeaderConfiguration(graphqlTypes, models) {
    return {
        model: models.header,
        actions: ['list', 'update', 'create', 'delete'],
        list: {
            before: function (findOptions) {
                return findOptions;
            }
        }
    };
}
exports["default"] = HeaderConfiguration;
