"use strict";
exports.__esModule = true;
function WebhookConfiguration(graphqlTypes, models, isEventAllowed) {
    return {
        model: models.webhook,
        actions: ['list', 'update', 'create', 'delete'],
        list: {
            before: function (findOptions) {
                return findOptions;
            },
            after: function (webhook, args, context, info) {
                var eventSecurityContext = args.eventSecurityContext, eventType = args.eventType;
                if (!webhook.length) {
                    throw new Error('No webhook found');
                }
                if (webhook.eventTypesWhitelist.length) {
                    if (!webhook.eventTypesWhitelist.includes(eventType)) {
                        throw new Error('This webhook is not subscribe at this event');
                    }
                }
                if (!isEventAllowed({ eventSecurityContext: eventSecurityContext, eventType: eventType, webhook: webhook })) {
                    throw new Error('Event is not allowed for this webhook');
                }
                return webhook;
            }
        }
    };
}
exports["default"] = WebhookConfiguration;
